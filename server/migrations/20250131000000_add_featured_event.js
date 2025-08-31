/**
 * Migration: Add featured event functionality
 * Adds is_featured column to events table to support hero-sized featured events on homepage
 */

exports.up = async function(knex) {
  console.log('🚀 Adding featured event functionality...');
  
  // Add is_featured column to events table
  await knex.schema.table('events', function(table) {
    table.boolean('is_featured').defaultTo(false).comment('Whether this event should be displayed as a hero-sized featured event');
    
    // Add index for performance when querying featured events
    table.index(['is_featured'], 'events_is_featured_index');
  });
  
  console.log('✅ Featured event functionality added successfully');
};

exports.down = async function(knex) {
  console.log('🔄 Removing featured event functionality...');
  
  // Remove the is_featured column and its index
  await knex.schema.table('events', function(table) {
    table.dropIndex(['is_featured'], 'events_is_featured_index');
    table.dropColumn('is_featured');
  });
  
  console.log('✅ Featured event functionality removed successfully');
};
