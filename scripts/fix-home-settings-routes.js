#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../server/routes/home_settings.routes.js');

console.log('🔧 Fixing home_settings.routes.js file...');

try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    console.log('📄 Original file size:', content.length, 'characters');
    
    // Count original references
    const originalDropRefs = (content.match(/query\.drop/g) || []).length;
    const originalDropVars = (content.match(/firstDrop|featuredDrops|updatedDrop|createdDrops|existingDrop|newDrop|dropData|dropError/g) || []).length;
    
    console.log('🔍 Found', originalDropRefs, 'query.drop references');
    console.log('🔍 Found', originalDropVars, 'drop variable references');
    
    // Replace query.drop references
    content = content.replace(/query\.drop/g, 'query.event');
    
    // Replace variable names
    content = content.replace(/firstDrop/g, 'firstEvent');
    content = content.replace(/featuredDrops/g, 'featuredEvents');
    content = content.replace(/updatedDrop/g, 'updatedEvent');
    content = content.replace(/createdDrops/g, 'createdEvents');
    content = content.replace(/existingDrop/g, 'existingEvent');
    content = content.replace(/newDrop/g, 'newEvent');
    content = content.replace(/dropData/g, 'eventData');
    content = content.replace(/dropError/g, 'eventError');
    content = content.replace(/sampleDrops/g, 'sampleEvents');
    
    // Replace text references
    content = content.replace(/drops found/g, 'events found');
    content = content.replace(/drops processed/g, 'events processed');
    content = content.replace(/drops created/g, 'events created');
    content = content.replace(/Sample drops/g, 'Sample events');
    content = content.replace(/sample drop/g, 'sample event');
    content = content.replace(/existing drop/g, 'existing event');
    content = content.replace(/first drop/g, 'first event');
    content = content.replace(/featured drops/g, 'featured events');
    content = content.replace(/getFeaturedDrops/g, 'getFeaturedEvents');
    
    // Count remaining references
    const remainingDropRefs = (content.match(/query\.drop/g) || []).length;
    const remainingDropVars = (content.match(/firstDrop|featuredDrops|updatedDrop|createdDrops|existingDrop|newDrop|dropData|dropError/g) || []).length;
    
    console.log('✅ Fixed', originalDropRefs - remainingDropRefs, 'query.drop references');
    console.log('✅ Fixed', originalDropVars - remainingDropVars, 'drop variable references');
    
    if (remainingDropRefs > 0 || remainingDropVars > 0) {
        console.log('⚠️ Still', remainingDropRefs, 'query.drop references remaining');
        console.log('⚠️ Still', remainingDropVars, 'drop variable references remaining');
    }
    
    // Write the fixed content back
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('💾 File updated successfully');
    console.log('🎉 All drop references have been changed to event');
    
} catch (error) {
    console.error('❌ Error fixing file:', error.message);
    process.exit(1);
}
