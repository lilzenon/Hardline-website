import React from 'react';

const DualHeroSection = ({ homeSettings, formattedDate }) => {
  return (
    <div
      className="dual-hero-section flex justify-between items-center"
      style={{
        width: '829px',
        height: '299px',
        gap: '24px'
      }}
    >

      {/* Frame 20 - Left Hero */}
      <div
        className="frame-20 relative"
        style={{
          width: '299px',
          height: '299px'
        }}
      >
        {/* Image with gradient overlay */}
        <div
          className="image absolute"
          style={{
            left: '0px',
            top: '0px',
            width: '299px',
            height: '299px',
            borderRadius: '24px',
            background: homeSettings?.event_image
              ? `linear-gradient(189deg, rgba(0, 0, 0, 0.00) 37.84%, rgba(0, 0, 0, 0.48) 55.87%, rgba(24, 24, 24, 0.96) 77.69%), url(${homeSettings.event_image}) lightgray 50% / cover no-repeat`
              : `linear-gradient(189deg, rgba(0, 0, 0, 0.00) 37.84%, rgba(0, 0, 0, 0.48) 55.87%, rgba(24, 24, 24, 0.96) 77.69%), url(/images/figma/hero-image.png) lightgray 50% / cover no-repeat`
          }}
        >
        {/* Frame 21 - Bottom overlay content */}
        <div
          className="frame-21 absolute flex justify-between"
          style={{
            left: '0px',
            top: '252px',
            width: '299px',
            padding: '0px 12px',
            gap: '45px'
          }}
        >
          {/* Left side content would go here */}
        </div>

        {/* Frame 22 - Event title overlay */}
        <div
          className="frame-22 absolute flex items-end"
          style={{
            left: '0px',
            top: '155px',
            width: '159px',
            height: '93px',
            padding: '10px 10px 0px 12px',
            gap: '10px'
          }}
        >
          <div
            style={{
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '24px',
              fontWeight: '800',
              lineHeight: 'normal',
              flex: '1'
            }}
          >
            {homeSettings?.event_title || "EVENT TITLE"}
          </div>
        </div>
          
        </div>
      </div>
      
      {/* Video Hero */}
      <div
        className="video-hero relative"
        style={{
          width: '510px',
          height: '299px'
        }}
      >
        {/* Video Background */}
        <div
          className="video absolute"
          style={{
            left: '0px',
            top: '0px',
            width: '511px',
            height: '289.97px',
            background: 'linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%)',
            borderRadius: '24px'
          }}
        />

        {/* Video Hero Text Box */}
        <div
          className="video-hero-text-box absolute flex justify-between items-center"
          style={{
            left: '0px',
            top: '257px',
            width: '505px',
            height: '32px',
            padding: '0px 9px',
            gap: '12px'
          }}
        >
          {/* Left side - Date and title */}
          <div className="flex flex-col justify-end">
            <div
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '10px',
                fontWeight: '200',
                lineHeight: 'normal'
              }}
            >
              {formattedDate || "March 29th, 9:00 P.M."}
            </div>
            <div
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '24px',
                fontWeight: '800',
                lineHeight: 'normal'
              }}
            >
              {homeSettings?.event_title || "EVENT TITLE"}
            </div>
          </div>

          {/* Right CTA */}
          <div
            className="flex justify-center items-center cursor-pointer"
            style={{
              width: '72px',
              height: '26px',
              padding: '13px 12px',
              gap: '10px',
              borderRadius: '37px',
              background: 'rgba(38, 38, 38, 0.80)'
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
        </div>
      </div>
      
    </div>
  );
};

export default DualHeroSection;
