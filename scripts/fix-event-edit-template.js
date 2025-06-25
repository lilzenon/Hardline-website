#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '../server/views/modern-event-edit.hbs');

console.log('🔧 Fixing modern-event-edit.hbs template...');

try {
    // Read the template file
    let content = fs.readFileSync(templatePath, 'utf8');
    
    console.log('📄 Original file size:', content.length, 'characters');
    
    // Count original drop. references
    const originalMatches = (content.match(/drop\./g) || []).length;
    console.log('🔍 Found', originalMatches, 'drop. references to fix');
    
    // Replace all drop. references with event.
    content = content.replace(/drop\./g, 'event.');
    
    // Count remaining drop. references
    const remainingMatches = (content.match(/drop\./g) || []).length;
    console.log('✅ Fixed', originalMatches - remainingMatches, 'references');
    
    if (remainingMatches > 0) {
        console.log('⚠️ Still', remainingMatches, 'drop. references remaining');
    }
    
    // Also fix some specific text references
    content = content.replace(/Active Drop/g, 'Active Event');
    content = content.replace(/edit this drop/g, 'edit this event');
    content = content.replace(/Drop not found/g, 'Event not found');
    content = content.replace(/your drop/g, 'your event');
    content = content.replace(/this drop/g, 'this event');
    content = content.replace(/\/drop\//g, '/event/');
    
    console.log('✅ Fixed text references as well');
    
    // Write the fixed content back
    fs.writeFileSync(templatePath, content, 'utf8');
    
    console.log('💾 Template file updated successfully');
    console.log('🎉 All drop references have been changed to event');
    
} catch (error) {
    console.error('❌ Error fixing template:', error.message);
    process.exit(1);
}
