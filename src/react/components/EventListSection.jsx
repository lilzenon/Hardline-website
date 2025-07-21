import React from 'react';
import EventCardSmall from './EventCardSmall';

const EventListSection = ({ featuredEvents }) => {
  return (
    <div
      className="event-list flex flex-col"
      style={{
        width: '507px',
        height: '453px',
        gap: '21px'
      }}
    >

      {/* EVENT LIST - Frame with flex wrap */}
      <div
        className="event-list-frame flex flex-wrap content-start"
        style={{
          width: '507px',
          flex: '1',
          gap: '7px'
        }}
      >

        {/* Render featured events */}
        {featuredEvents.map((event, index) => (
          <EventCardSmall key={event.id || index} event={event} />
        ))}

        {/* Fill remaining slots with placeholder cards if needed */}
        {Array.from({ length: Math.max(0, 8 - featuredEvents.length) }).map((_, index) => (
          <EventCardSmall
            key={`placeholder-${index}`}
            event={{
              title: "Event Title",
              artist_name: "Artist Name",
              cover_image: null
            }}
            isPlaceholder={true}
          />
        ))}

      </div>

    </div>
  );
};

export default EventListSection;
