#!/usr/bin/env node

/**
 * Build and Commit Script
 * Automatically builds React bundle and commits production files
 * Ensures production files are never forgotten in git commits
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️  Building and committing production files...\n');

try {
    // Change to React directory and build
    console.log('📦 Building React bundle...');
    process.chdir(path.join(__dirname, '../src/react'));
    execSync('npm run build', { stdio: 'inherit' });
    
    // Change back to root
    process.chdir(path.join(__dirname, '..'));
    
    // Check what files changed
    console.log('\n🔍 Checking for changes...');
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (!status.trim()) {
        console.log('✅ No changes to commit');
        process.exit(0);
    }
    
    // Add critical production files
    const criticalFiles = [
        'static/react/bundle.js',
        'static/react/index.html',
        'static/react/484.chunk.js',
        'static/react/731.chunk.js',
        'build-info.json'
    ];
    
    const filesToAdd = [];
    for (const file of criticalFiles) {
        if (fs.existsSync(file)) {
            // Check if file has changes
            try {
                execSync(`git diff --quiet HEAD -- "${file}"`, { stdio: 'pipe' });
            } catch (error) {
                // File has changes, add it
                filesToAdd.push(file);
            }
        }
    }
    
    if (filesToAdd.length === 0) {
        console.log('✅ No production files need updating');
        process.exit(0);
    }
    
    console.log('📁 Adding production files:');
    filesToAdd.forEach(file => console.log(`   - ${file}`));
    
    // Add files to git
    execSync(`git add ${filesToAdd.map(f => `"${f}"`).join(' ')}`);
    
    // Get current commit hash for reference
    const currentCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim().substring(0, 7);
    
    // Commit with descriptive message
    const commitMessage = `build: Update production bundle and assets

🔄 Auto-generated build commit:
- Updated React bundle with latest source changes
- Synced production assets with development code
- Build timestamp: ${new Date().toISOString()}
- Source commit: ${currentCommit}

📦 Files updated:
${filesToAdd.map(f => `- ${f}`).join('\n')}`;

    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    
    console.log('\n✅ Production files committed successfully!');
    console.log('🚀 Ready to push to production');
    
} catch (error) {
    console.error('❌ Error during build and commit:', error.message);
    process.exit(1);
}
