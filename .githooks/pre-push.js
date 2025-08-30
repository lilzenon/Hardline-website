#!/usr/bin/env node

/**
 * Pre-push hook to ensure critical production files are included
 * Windows-compatible Node.js version
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking for required production files before push...');

// Define critical files that must be included in commits (UPDATED FOR VITE BUILD)
const CRITICAL_FILES = [
    'dist/index.html',
    'build-info.json'
];

try {
    // Check if any critical files have uncommitted changes
    const uncommittedCritical = [];

    for (const file of CRITICAL_FILES) {
        try {
            execSync(`git diff --quiet HEAD -- "${file}"`, { stdio: 'pipe' });
        } catch (error) {
            // File has changes
            uncommittedCritical.push(file);
        }
    }

    // Check if any React source files were changed in recent commits
    const recentReactChanges = execSync('git diff HEAD~3..HEAD --name-only', { encoding: 'utf8' })
        .split('\n')
        .filter(line => line.match(/src\/react\/.*\.(jsx?|css)$/))
        .length;

    // If React source files changed but bundle wasn't updated, warn
    if (recentReactChanges > 0 && uncommittedCritical.length > 0) {
        console.log('⚠️  WARNING: React source files were changed but production bundle may be outdated!');
        console.log('');
        console.log('📁 Uncommitted critical files:');
        uncommittedCritical.forEach(file => console.log(`   - ${file}`));
        console.log('');
        console.log('🔧 To fix this, run:');
        console.log('   npm run build:commit');
        console.log('');
        console.log('❓ Continuing with push anyway...');
    }

    // Check if Vite build exists
    if (!fs.existsSync('dist/index.html')) {
        console.log('❌ ERROR: dist/index.html is missing!');
        console.log('🔧 Run: npm run build');
        process.exit(1);
    }

    // Check if Vite build is older than source files
    const buildStats = fs.statSync('dist/index.html');
    const buildTime = buildStats.mtime.getTime();

    let newestSourceTime = 0;

    // Find newest React source file
    function findNewestInDir(dir) {
        if (!fs.existsSync(dir)) return;

        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                findNewestInDir(fullPath);
            } else if (item.match(/\.(jsx?|css)$/)) {
                const fileTime = stats.mtime.getTime();
                if (fileTime > newestSourceTime) {
                    newestSourceTime = fileTime;
                }
            }
        }
    }

    findNewestInDir('src');

    if (newestSourceTime > buildTime) {
        console.log('⚠️  WARNING: React source files are newer than Vite build');
        console.log('🔧 Consider running: npm run build');
    }

    console.log('✅ Pre-push checks completed');
    process.exit(0);

} catch (error) {
    console.error('❌ Error during pre-push check:', error.message);
    process.exit(1);
}