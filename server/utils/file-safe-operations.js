const fs = require('fs').promises;
const path = require('path');

/**
 * Safe file operations to prevent corruption
 */

/**
 * Safely write to a file with backup and atomic operations
 */
async function safeWriteFile(filePath, content, options = {}) {
    const { encoding = 'utf8', backup = true } = options;
    
    try {
        // Create backup if requested
        if (backup && await fileExists(filePath)) {
            const backupPath = `${filePath}.backup.${Date.now()}`;
            await fs.copyFile(filePath, backupPath);
            console.log(`📦 Created backup: ${backupPath}`);
        }
        
        // Write to temporary file first (atomic operation)
        const tempPath = `${filePath}.tmp.${Date.now()}`;
        await fs.writeFile(tempPath, content, { encoding });
        
        // Move temp file to final location (atomic on most filesystems)
        await fs.rename(tempPath, filePath);
        
        console.log(`✅ Safely wrote file: ${filePath}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Failed to safely write file ${filePath}:`, error);
        throw error;
    }
}

/**
 * Check if file exists
 */
async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

/**
 * Safely read file with error handling
 */
async function safeReadFile(filePath, options = {}) {
    const { encoding = 'utf8', fallback = null } = options;
    
    try {
        const content = await fs.readFile(filePath, { encoding });
        return content;
    } catch (error) {
        console.warn(`⚠️ Failed to read file ${filePath}:`, error.message);
        return fallback;
    }
}

/**
 * Clean up old backup files
 */
async function cleanupBackups(filePath, maxAge = 24 * 60 * 60 * 1000) { // 24 hours
    try {
        const dir = path.dirname(filePath);
        const basename = path.basename(filePath);
        const files = await fs.readdir(dir);
        
        const backupFiles = files.filter(f => f.startsWith(`${basename}.backup.`));
        const now = Date.now();
        
        for (const backupFile of backupFiles) {
            const backupPath = path.join(dir, backupFile);
            const stats = await fs.stat(backupPath);
            
            if (now - stats.mtime.getTime() > maxAge) {
                await fs.unlink(backupPath);
                console.log(`🗑️ Cleaned up old backup: ${backupFile}`);
            }
        }
    } catch (error) {
        console.warn('⚠️ Failed to cleanup backups:', error.message);
    }
}

module.exports = {
    safeWriteFile,
    safeReadFile,
    fileExists,
    cleanupBackups
};
