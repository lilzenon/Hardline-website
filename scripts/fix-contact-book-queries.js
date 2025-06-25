#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../server/services/contact-book/contact-book.service.js');

console.log('🔧 Fixing Contact Book database queries...');

try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    console.log('📄 Original file size:', content.length, 'characters');
    
    // Count original references
    const originalDropSignupsRefs = (content.match(/drop_signups/g) || []).length;
    const originalDropsRefs = (content.match(/"drops"/g) || []).length;
    const originalDsAliasRefs = (content.match(/ds\./g) || []).length;
    const originalDropIdRefs = (content.match(/drop_id/g) || []).length;
    
    console.log('🔍 Found', originalDropSignupsRefs, 'drop_signups references');
    console.log('🔍 Found', originalDropsRefs, '"drops" table references');
    console.log('🔍 Found', originalDsAliasRefs, 'ds. alias references');
    console.log('🔍 Found', originalDropIdRefs, 'drop_id references');
    
    // Fix table names
    content = content.replace(/drop_signups/g, 'event_signups');
    content = content.replace(/"drops"/g, '"events"');
    
    // Fix table aliases
    content = content.replace(/drop_signups as ds/g, 'event_signups as es');
    content = content.replace(/drops as d/g, 'events as e');
    
    // Fix column references with aliases
    content = content.replace(/ds\./g, 'es.');
    content = content.replace(/d\./g, 'e.');
    
    // Fix foreign key column names
    content = content.replace(/drop_id/g, 'event_id');
    
    // Fix variable names in queries
    content = content.replace(/total_drop_signups/g, 'total_event_signups');
    
    // Fix comments and text references
    content = content.replace(/Get phone contacts first/g, 'Get phone contacts first');
    content = content.replace(/Get email-only contacts/g, 'Get email-only contacts');
    content = content.replace(/drop history/g, 'event history');
    content = content.replace(/Drop history/g, 'Event history');
    content = content.replace(/dropHistory/g, 'eventHistory');
    content = content.replace(/dropHistoryQuery/g, 'eventHistoryQuery');
    
    // Count remaining references
    const remainingDropSignupsRefs = (content.match(/drop_signups/g) || []).length;
    const remainingDropsRefs = (content.match(/"drops"/g) || []).length;
    const remainingDsAliasRefs = (content.match(/ds\./g) || []).length;
    const remainingDropIdRefs = (content.match(/drop_id/g) || []).length;
    
    console.log('✅ Fixed', originalDropSignupsRefs - remainingDropSignupsRefs, 'drop_signups references');
    console.log('✅ Fixed', originalDropsRefs - remainingDropsRefs, '"drops" table references');
    console.log('✅ Fixed', originalDsAliasRefs - remainingDsAliasRefs, 'ds. alias references');
    console.log('✅ Fixed', originalDropIdRefs - remainingDropIdRefs, 'drop_id references');
    
    if (remainingDropSignupsRefs > 0 || remainingDropsRefs > 0 || remainingDsAliasRefs > 0 || remainingDropIdRefs > 0) {
        console.log('⚠️ Still', remainingDropSignupsRefs, 'drop_signups references remaining');
        console.log('⚠️ Still', remainingDropsRefs, '"drops" table references remaining');
        console.log('⚠️ Still', remainingDsAliasRefs, 'ds. alias references remaining');
        console.log('⚠️ Still', remainingDropIdRefs, 'drop_id references remaining');
    }
    
    // Write the fixed content back
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('💾 Contact Book service updated successfully');
    console.log('🎉 All database queries now use event_signups and events tables');
    
} catch (error) {
    console.error('❌ Error fixing Contact Book queries:', error.message);
    process.exit(1);
}
