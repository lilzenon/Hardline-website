import React from 'react';

const VideoHero = ({ homeSettings, formattedDate }) => {
  return (
    <div className="video-hero relative w-full max-w-[510px] h-[299px] mx-auto">
      {/* Video Background */}
      <div className="video relative w-full h-full rounded-[24px] overflow-hidden">
        {/* Background with gradient overlay */}
        <div 
          className="absolute inset-0 rounded-[24px]"
          style={{
            background: homeSettings?.event_image 
              ? `linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%), url(${homeSettings.event_image})`
              : 'linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Video Hero Text Box */}
        <div className="video-hero-text-box absolute bottom-0 left-0 right-0 flex justify-between items-center px-[9px] h-[32px]">
          {/* Left side - Event info */}
          <div className="frame-3 flex flex-col justify-end items-start h-[32px]">
            <div className="group-6 w-[197px] h-[32px]">
              {/* Date */}
              <div className="date flex items-center gap-[-9px] w-[192px] h-[15px] pt-[2px]">
                <div className="video-hero-subtitle text-white text-[10px] font-extralight leading-normal w-[146px] h-[15px] flex flex-col justify-center">
                  {formattedDate || "March 29th, 9:00 P.M."}
                </div>
              </div>
              
              {/* Event Title */}
              <div className="video-hero-title text-white text-[24px] font-extrabold leading-normal">
                {homeSettings?.event_title || "EVENT TITLE"}
              </div>
            </div>
          </div>
          
          {/* Right side - CTA Button */}
          <div className="video-hero-cta flex justify-center items-center w-[72px] h-[26px] px-[12px] py-[13px] gap-[10px] rounded-[37px] bg-black/80">
            <span className="events text-white text-[10px] font-medium leading-normal">
              Events
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
