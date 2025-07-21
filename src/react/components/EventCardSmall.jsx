import React from 'react';

const EventCardSmall = ({ event, isPlaceholder = false }) => {
  const handleClick = () => {
    if (!isPlaceholder && event.slug) {
      window.location.href = `/event/${event.slug}`;
    }
  };

  return (
    <div
      className={`eventcardsmall flex items-center ${!isPlaceholder ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      style={{
        width: '313px',
        height: '116px',
        gap: '12px',
        padding: '5px 6px',
        borderRadius: '12px',
        background: 'rgba(39, 39, 39, 0.2)'
      }}
      onClick={handleClick}
    >

      {/* Frame 6 - Image container */}
      <div
        className="frame-6 relative"
        style={{
          width: '106px',
          height: '106px'
        }}
      >
        {/* Rectangle 2 - Main image */}
        <div
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '106px',
            height: '106px',
            borderRadius: '9px',
            background: event.cover_image
              ? `url(${event.cover_image}) lightgray 50% / cover no-repeat`
              : `#A62A0C url(/images/figma/event-card-image.png) lightgray 50% / cover no-repeat`
          }}
        />

        {/* Frame 7 - Date badge */}
        <div
          className="frame-7 absolute"
          style={{
            left: '75px',
            top: '4px',
            width: '26.5px',
            height: '26.5px'
          }}
        >
          {/* Rectangle 1 - Date background */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '26.5px',
              height: '26.5px',
              borderRadius: '4px',
              background: '#FFF'
            }}
          />

          {/* Date text */}
          <div
            className="date-group absolute"
            style={{
              left: '3px',
              top: '3px',
              width: '20px',
              height: '19px',
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '8px',
              fontWeight: '600',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {event.event_date ? new Date(event.event_date).getDate() : '29'}
          </div>
        </div>
      </div>

      {/* Frame 4 - Content */}
      <div
        className="frame-4 flex flex-col justify-between"
        style={{
          width: '183px',
          height: '106px',
          gap: '12px'
        }}
      >

        {/* Frame 3 - Text content */}
        <div
          className="frame-3 flex flex-col"
          style={{
            width: '183px',
            height: '80px'
          }}
        >
          {/* Event Title */}
          <div
            style={{
              height: '21px',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '24px',
              fontWeight: '800',
              lineHeight: 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {event.title || "Event Title"}
          </div>

          {/* DATE and LOCATION frames would go here */}
        </div>

        {/* Pages - CTA section */}
        <div
          className="pages flex justify-center items-center"
          style={{
            width: '183px',
            height: '26px',
            gap: '4px',
            padding: '4px'
          }}
        >
          {/* Events button */}
          <div
            className="events flex justify-center items-center"
            style={{
              width: '142px',
              height: '26px',
              padding: '13px 12px',
              gap: '10px',
              borderRadius: '37px',
              background: 'rgba(38, 38, 38, 0.8)'
            }}
          >
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '10px',
                fontWeight: '500',
                lineHeight: 'normal'
              }}
            >
              Events
            </span>
          </div>

          {/* Frame 5 - Additional button space */}
          <div
            style={{
              width: '29px',
              height: '26px'
            }}
          />
        </div>

      </div>

    </div>
  );
};

export default EventCardSmall;
