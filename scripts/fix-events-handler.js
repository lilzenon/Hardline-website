#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../server/handlers/events.handler.js');

console.log('🔧 Fixing events.handler.js file...');

try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    console.log('📄 Original file size:', content.length, 'characters');
    
    // Count original references
    const originalDropRefs = (content.match(/Drop not found|Drop is|drop with this slug|drop signup|drop settings|drop goes live/g) || []).length;
    const originalVarRefs = (content.match(/foundevent|existingevent|dropWithStats|updatedevent|foundDrop|existingDrop/g) || []).length;
    
    console.log('🔍 Found', originalDropRefs, 'drop text references');
    console.log('🔍 Found', originalVarRefs, 'variable references');
    
    // Fix error messages and text references
    content = content.replace(/Drop not found/g, 'Event not found');
    content = content.replace(/Drop is currently inactive/g, 'Event is currently inactive');
    content = content.replace(/drop with this slug/g, 'event with this slug');
    content = content.replace(/drop signup/g, 'event signup');
    content = content.replace(/drop settings/g, 'event settings');
    content = content.replace(/drop goes live/g, 'event goes live');
    content = content.replace(/this drop/g, 'this event');
    content = content.replace(/for drop/g, 'for event');
    content = content.replace(/Using pre-fetched drop/g, 'Using pre-fetched event');
    content = content.replace(/Drop settings:/g, 'Event settings:');
    
    // Fix variable names
    content = content.replace(/foundevent/g, 'foundEvent');
    content = content.replace(/existingevent/g, 'existingEvent');
    content = content.replace(/dropWithStats/g, 'eventWithStats');
    content = content.replace(/updatedevent/g, 'updatedEvent');
    content = content.replace(/foundDrop/g, 'foundEvent');
    content = content.replace(/existingDrop/g, 'existingEvent');
    content = content.replace(/updatedDrop/g, 'updatedEvent');
    content = content.replace(/newDrop/g, 'newEvent');
    
    // Fix function parameter names and comments
    content = content.replace(/dropData/g, 'eventData');
    content = content.replace(/dropId/g, 'eventId');
    content = content.replace(/Create a new drop/g, 'Create a new event');
    content = content.replace(/Get user's drops/g, 'Get user\'s events');
    content = content.replace(/Get single drop/g, 'Get single event');
    content = content.replace(/Update drop/g, 'Update event');
    content = content.replace(/Delete drop/g, 'Delete event');
    content = content.replace(/Public drop signup/g, 'Public event signup');
    
    // Fix console log messages
    content = content.replace(/Drop collection settings/g, 'Event collection settings');
    content = content.replace(/Drop signup attempt/g, 'Event signup attempt');
    content = content.replace(/Homepage toggle changed for drop/g, 'Homepage toggle changed for event');
    content = content.replace(/Drop \$\{id\} updated successfully/g, 'Event ${id} updated successfully');
    content = content.replace(/Error updating drop/g, 'Error updating event');
    content = content.replace(/Error creating\/updating drop/g, 'Error creating/updating event');
    
    // Count remaining references
    const remainingDropRefs = (content.match(/Drop not found|Drop is|drop with this slug|drop signup|drop settings|drop goes live/g) || []).length;
    const remainingVarRefs = (content.match(/foundevent|existingevent|dropWithStats|updatedevent|foundDrop|existingDrop/g) || []).length;
    
    console.log('✅ Fixed', originalDropRefs - remainingDropRefs, 'drop text references');
    console.log('✅ Fixed', originalVarRefs - remainingVarRefs, 'variable references');
    
    if (remainingDropRefs > 0 || remainingVarRefs > 0) {
        console.log('⚠️ Still', remainingDropRefs, 'drop text references remaining');
        console.log('⚠️ Still', remainingVarRefs, 'variable references remaining');
    }
    
    // Write the fixed content back
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('💾 File updated successfully');
    console.log('🎉 All drop references have been changed to event');
    
} catch (error) {
    console.error('❌ Error fixing file:', error.message);
    process.exit(1);
}
