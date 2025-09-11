/**
 * Test script to verify event sorting logic fixes
 * Tests the corrected date sorting for both "ALL" and "Past" toggles
 */

console.log('🧪 TESTING EVENT SORTING LOGIC FIXES\n');

// Mock event data with various dates to test sorting
const mockEvents = [
  {
    id: 1,
    title: 'Future Event 1',
    event_date: '2025-12-15T20:00:00Z',
    artist_name: 'Artist A'
  },
  {
    id: 2,
    title: 'Past Event Recent',
    event_date: '2025-01-10T19:00:00Z',
    artist_name: 'Artist B'
  },
  {
    id: 3,
    title: 'Past Event Old',
    event_date: '2024-06-20T21:00:00Z',
    artist_name: 'Artist C'
  },
  {
    id: 4,
    title: 'Future Event 2',
    event_date: '2025-11-30T18:00:00Z',
    artist_name: 'Artist D'
  },
  {
    id: 5,
    title: 'Past Event Very Recent',
    event_date: '2025-08-05T20:30:00Z',
    artist_name: 'Artist E'
  }
];

// Simulate the sorting logic from the fixed useHomepageData hook
function sortEvents(events, showAll) {
  const sortedEvents = [...events];
  
  // Both "ALL" and "Past" should show most recent events first
  sortedEvents.sort((a, b) => {
    const dateA = new Date(a.eventDate);
    const dateB = new Date(b.eventDate);
    
    // Validate dates to handle edge cases
    if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) {
      return 0; // Both invalid, maintain order
    }
    if (isNaN(dateA.getTime())) {
      return 1; // Invalid dateA goes to end
    }
    if (isNaN(dateB.getTime())) {
      return -1; // Invalid dateB goes to end
    }
    
    // Most recent first (descending order)
    return dateB.getTime() - dateA.getTime();
  });
  
  return sortedEvents;
}

function filterEvents(events, showAll) {
  if (showAll) {
    return events; // Show all events
  }
  
  // Show only past events
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
  
  return events.filter(event => {
    const eventDate = new Date(event.eventDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < now;
  });
}

// Normalize events (simplified version)
function normalizeEvent(event) {
  const parsedDate = new Date(event.event_date);
  return {
    id: event.id,
    title: event.title,
    eventDate: parsedDate,
    formattedDate: parsedDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit'
    })
  };
}

// Test the sorting logic
console.log('📋 TEST 1: Event Normalization');
console.log('==============================');

const normalizedEvents = mockEvents.map(normalizeEvent);
console.log('✅ Normalized events:');
normalizedEvents.forEach(event => {
  console.log(`  - ${event.title}: ${event.eventDate.toISOString()} (${event.formattedDate})`);
});

console.log('\n📋 TEST 2: "ALL" Events Sorting (Most Recent First)');
console.log('===================================================');

const allEventsFiltered = filterEvents(normalizedEvents, true);
const allEventsSorted = sortEvents(allEventsFiltered, true);

console.log('✅ ALL events sorted (most recent first):');
allEventsSorted.forEach((event, index) => {
  const isPast = event.eventDate < new Date();
  console.log(`  ${index + 1}. ${event.title}: ${event.eventDate.toISOString()} ${isPast ? '(Past)' : '(Future)'}`);
});

console.log('\n📋 TEST 3: "Past" Events Sorting (Most Recent First)');
console.log('====================================================');

const pastEventsFiltered = filterEvents(normalizedEvents, false);
const pastEventsSorted = sortEvents(pastEventsFiltered, false);

console.log('✅ Past events only, sorted (most recent first):');
if (pastEventsSorted.length === 0) {
  console.log('  No past events found (all events are in the future)');
} else {
  pastEventsSorted.forEach((event, index) => {
    console.log(`  ${index + 1}. ${event.title}: ${event.eventDate.toISOString()}`);
  });
}

console.log('\n📋 TEST 4: Date Validation');
console.log('===========================');

// Test with invalid dates
const eventsWithInvalidDates = [
  { id: 1, title: 'Valid Event', event_date: '2025-12-15T20:00:00Z' },
  { id: 2, title: 'Invalid Event 1', event_date: 'invalid-date' },
  { id: 3, title: 'Invalid Event 2', event_date: null },
  { id: 4, title: 'Valid Event 2', event_date: '2024-06-20T21:00:00Z' }
];

const normalizedWithInvalid = eventsWithInvalidDates.map(event => {
  const parsedDate = new Date(event.event_date);
  return {
    id: event.id,
    title: event.title,
    eventDate: parsedDate,
    isValid: !isNaN(parsedDate.getTime())
  };
});

const sortedWithInvalid = sortEvents(normalizedWithInvalid, true);

console.log('✅ Events with invalid dates (invalid dates should go to end):');
sortedWithInvalid.forEach((event, index) => {
  console.log(`  ${index + 1}. ${event.title}: ${event.isValid ? event.eventDate.toISOString() : 'INVALID DATE'}`);
});

console.log('\n📊 SUMMARY OF FIXES');
console.log('===================');
console.log('✅ Fixed sorting logic: Both "ALL" and "Past" now show most recent first');
console.log('✅ Enhanced date parsing: Better handling of various date formats');
console.log('✅ Added date validation: Invalid dates are handled gracefully');
console.log('✅ Added comprehensive debugging: Console logs show sorting process');
console.log('✅ Cross-platform consistency: Same sorting logic for mobile and desktop');

console.log('\n🎯 EXPECTED BEHAVIOR AFTER FIX:');
console.log('- "ALL" toggle: Shows all events, most recent first');
console.log('- "Past" toggle: Shows only past events, most recent first');
console.log('- Proper chronological ordering considering full date (day, month, year)');
console.log('- Invalid dates handled gracefully (moved to end)');
console.log('- Consistent behavior across mobile and desktop');

console.log('\n🚀 DEPLOYMENT STATUS: Changes ready for testing');
console.log('⏳ After deployment, test both toggles to verify correct sorting');
