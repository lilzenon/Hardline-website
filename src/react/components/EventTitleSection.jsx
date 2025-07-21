import React from 'react';

const EventTitleSection = ({ homeSettings }) => {
  return (
    <div
      className="frame-13 flex justify-between items-center"
      style={{
        width: '825px',
        height: '32px',
        gap: '20px'
      }}
    >

      {/* Event Title */}
      <div
        style={{
          width: '504px',
          color: '#FFF',
          fontFamily: 'Inter',
          fontSize: '24px',
          fontWeight: '800',
          lineHeight: 'normal'
        }}
      >
        Events
      </div>

      {/* Frame 17 - Right side info */}
      <div
        className="frame-17 flex flex-col justify-center gap-[4px]"
        style={{
          width: '299px',
          height: '32px'
        }}
      >

        {/* Event Title */}
        <div
          style={{
            height: '17px',
            color: '#FFF',
            fontFamily: 'Inter',
            fontSize: '24px',
            fontWeight: '800',
            lineHeight: 'normal',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Text us
        </div>

        {/* Date */}
        <div
          style={{
            height: '11px',
            color: '#FFF',
            fontFamily: 'Inter',
            fontSize: '10px',
            fontWeight: '300',
            lineHeight: 'normal',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Exclusive events, contests, and more
        </div>

      </div>

    </div>
  );
};

export default EventTitleSection;
