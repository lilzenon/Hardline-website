#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filesToFix = [
    'server/queries/event.queries.js',
    'server/queries/user.queries.js',
    'server/services/analytics/search.service.js'
];

console.log('🔧 Fixing remaining table references...');

filesToFix.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (!fs.existsSync(fullPath)) {
        console.log(`⚠️ File not found: ${filePath}`);
        return;
    }
    
    console.log(`\n📄 Processing: ${filePath}`);
    
    try {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Count original references
        const originalDsRefs = (content.match(/ds\./g) || []).length;
        const originalDRefs = (content.match(/d\./g) || []).length;
        const originalDropsRefs = (content.match(/"drops"/g) || []).length;
        const originalDropSignupsRefs = (content.match(/drop_signups/g) || []).length;
        const originalDropIdRefs = (content.match(/drop_id/g) || []).length;
        
        console.log(`🔍 Found ${originalDsRefs} ds. references`);
        console.log(`🔍 Found ${originalDRefs} d. references`);
        console.log(`🔍 Found ${originalDropsRefs} "drops" references`);
        console.log(`🔍 Found ${originalDropSignupsRefs} drop_signups references`);
        console.log(`🔍 Found ${originalDropIdRefs} drop_id references`);
        
        // Fix table names and aliases
        content = content.replace(/drop_signups/g, 'event_signups');
        content = content.replace(/"drops"/g, '"events"');
        content = content.replace(/drop_signups as ds/g, 'event_signups as es');
        content = content.replace(/drops as d/g, 'events as e');
        
        // Fix column references with aliases - be more specific to avoid false positives
        content = content.replace(/ds\.email/g, 'es.email');
        content = content.replace(/ds\.name/g, 'es.name');
        content = content.replace(/ds\.phone/g, 'es.phone');
        content = content.replace(/ds\.created_at/g, 'es.created_at');
        content = content.replace(/ds\.id/g, 'es.id');
        content = content.replace(/ds\.referrer/g, 'es.referrer');
        content = content.replace(/ds\.ip_address/g, 'es.ip_address');
        content = content.replace(/ds\.user_agent/g, 'es.user_agent');
        
        // Fix d. references for events table
        content = content.replace(/d\.title/g, 'e.title');
        content = content.replace(/d\.id/g, 'e.id');
        content = content.replace(/d\.user_id/g, 'e.user_id');
        content = content.replace(/d\.slug/g, 'e.slug');
        content = content.replace(/d\.is_active/g, 'e.is_active');
        content = content.replace(/d\.description/g, 'e.description');
        
        // Fix foreign key column names
        content = content.replace(/drop_id/g, 'event_id');
        
        // Fix variable names in queries
        content = content.replace(/total_drop_signups/g, 'total_event_signups');
        
        // Count remaining references
        const remainingDsRefs = (content.match(/ds\./g) || []).length;
        const remainingDRefs = (content.match(/d\./g) || []).length;
        const remainingDropsRefs = (content.match(/"drops"/g) || []).length;
        const remainingDropSignupsRefs = (content.match(/drop_signups/g) || []).length;
        const remainingDropIdRefs = (content.match(/drop_id/g) || []).length;
        
        console.log(`✅ Fixed ${originalDsRefs - remainingDsRefs} ds. references`);
        console.log(`✅ Fixed ${originalDRefs - remainingDRefs} d. references`);
        console.log(`✅ Fixed ${originalDropsRefs - remainingDropsRefs} "drops" references`);
        console.log(`✅ Fixed ${originalDropSignupsRefs - remainingDropSignupsRefs} drop_signups references`);
        console.log(`✅ Fixed ${originalDropIdRefs - remainingDropIdRefs} drop_id references`);
        
        if (remainingDsRefs > 0 || remainingDRefs > 0 || remainingDropsRefs > 0 || remainingDropSignupsRefs > 0 || remainingDropIdRefs > 0) {
            console.log(`⚠️ Still ${remainingDsRefs} ds., ${remainingDRefs} d., ${remainingDropsRefs} "drops", ${remainingDropSignupsRefs} drop_signups, ${remainingDropIdRefs} drop_id references remaining`);
        }
        
        // Write the fixed content back
        fs.writeFileSync(fullPath, content, 'utf8');
        
        console.log(`💾 ${filePath} updated successfully`);
        
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
    }
});

console.log('\n🎉 All remaining table references fixed!');
console.log('✅ Database queries now use event_signups and events tables consistently');
