import React from 'react';

const FigmaDesktop = () => {
  return (
    <div 
      className="desktop"
      style={{
        width: '1456px',
        height: '982px',
        position: 'relative',
        margin: '0 auto'
      }}
    >
      {/* Rectangle 3 - Black Background */}
      <div 
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: '1456px',
          height: '982px',
          background: '#000000'
        }}
      />
      
      {/* Frame 12 - Navigation */}
      <div
        style={{
          position: 'absolute',
          left: '313px',
          top: '35px',
          display: 'flex',
          width: '830px',
          height: '48px',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '500px',
          paddingLeft: '10px'
        }}
      >
        {/* Group 4 - B2B Logo Nav */}
        <img
          src="/images/figma-exact/b2b-logo-nav.svg"
          alt="B2B Logo"
          style={{
            width: '138.41px',
            height: '43px'
          }}
        />

        {/* Group 5 - Navigation Pills */}
        <div
          style={{
            position: 'relative',
            width: '226.49px',
            height: '34px'
          }}
        >
          {/* Background pill container */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '226.49px',
              height: '34px',
              background: '#232323',
              borderRadius: '12px',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            }}
          />

          {/* Events - Selected */}
          <div
            style={{
              position: 'absolute',
              left: '3.24px',
              top: '3.61px',
              display: 'flex',
              width: '71.77px',
              height: '26.79px',
              padding: '13px 12px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '10px',
              background: '#000',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: '300',
                lineHeight: 'normal'
              }}
            >
              Events
            </span>
          </div>

          {/* About */}
          <div
            style={{
              position: 'absolute',
              left: '77.03px',
              top: '3.61px',
              display: 'flex',
              width: '71.77px',
              height: '26.79px',
              padding: '13px 12px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: 'normal'
              }}
            >
              About
            </span>
          </div>

          {/* Contact */}
          <div
            style={{
              position: 'absolute',
              left: '150.82px',
              top: '3.61px',
              display: 'flex',
              width: '71.77px',
              height: '26.79px',
              padding: '13px 12px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: 'normal'
              }}
            >
              Contact
            </span>
          </div>
        </div>
      </div>

      {/* Dual Hero Section */}
      <div
        style={{
          position: 'absolute',
          left: '313px',
          top: '99px',
          display: 'flex',
          width: '829px',
          height: '299px',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {/* Frame 20 - Left Hero */}
        <div
          style={{
            width: '299px',
            height: '299px',
            position: 'relative'
          }}
        >
          {/* Hero Image with Gradient */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '299px',
              height: '299px',
              borderRadius: '24px',
              background: `linear-gradient(189deg, rgba(0, 0, 0, 0.00) 37.84%, rgba(0, 0, 0, 0.48) 55.87%, rgba(24, 24, 24, 0.96) 77.69%), url(/images/figma-exact/hero-left-image.png) lightgray 50% / cover no-repeat`
            }}
          />

          {/* Frame 21 - Bottom overlay */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '252px',
              display: 'flex',
              width: '299px',
              justifyContent: 'space-between',
              padding: '0px 12px',
              gap: '45px'
            }}
          >
            {/* Frame 3 - Left info */}
            <div
              style={{
                display: 'flex',
                width: '157px',
                height: '36px',
                padding: '4px 0px',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              {/* Date row */}
              <div
                style={{
                  display: 'flex',
                  alignSelf: 'stretch',
                  flexWrap: 'wrap',
                  gap: '4px'
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8" stroke="#FFF" strokeWidth="1"/>
                </svg>
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: '200',
                    lineHeight: 'normal'
                  }}
                >
                  March 29th, 9:00 P.M.
                </span>
              </div>

              {/* Location row */}
              <div
                style={{
                  display: 'flex',
                  alignSelf: 'stretch',
                  flexWrap: 'wrap',
                  gap: '4px'
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" stroke="#FFF" strokeWidth="1"/>
                  <circle cx="5" cy="4" r="1" fill="#FFF"/>
                </svg>
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: '200',
                    lineHeight: 'normal'
                  }}
                >
                  Asbury Park, NJ
                </span>
              </div>
            </div>

            {/* Pages - CTA */}
            <div
              style={{
                display: 'flex',
                width: '102px',
                height: '36px',
                padding: '4px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: '102px',
                  height: '36px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '29px',
                  background: 'rgba(56, 56, 56, 0.80)',
                  cursor: 'pointer'
                }}
              >
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: 'normal'
                  }}
                >
                  Events
                </span>
              </div>
            </div>
          </div>

          {/* Frame 22 - Event title overlay */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '155px',
              display: 'flex',
              width: '159px',
              height: '93px',
              padding: '10px 10px 0px 12px',
              justifyContent: 'stretch',
              alignItems: 'stretch',
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
              EVENT TITLE
            </div>
          </div>
        </div>

        {/* Video Hero - Right */}
        <div
          style={{
            width: '510px',
            height: '299px',
            position: 'relative'
          }}
        >
          {/* Video Background */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '511px',
              height: '289.97px',
              borderRadius: '24px',
              background: `linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%), url(/images/figma-exact/hero-right-video.png) lightgray 0px 0px / 100% 100% no-repeat`
            }}
          />

          {/* Video Hero Text Box */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '257px',
              display: 'flex',
              width: '505px',
              height: '32px',
              padding: '0px 9px',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            {/* Left - Date and title */}
            <div
              style={{
                display: 'flex',
                height: '32px',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
              <div
                style={{
                  width: '197px',
                  height: '32px'
                }}
              >
                {/* Date */}
                <div
                  style={{
                    position: 'absolute',
                    left: '5px',
                    top: '17px',
                    display: 'flex',
                    width: '192px',
                    height: '15px',
                    padding: '2px 0px 0px',
                    alignItems: 'center',
                    gap: '-9px'
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      width: '146px',
                      height: '15px',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      color: '#FFF',
                      fontFamily: 'Inter',
                      fontSize: '10px',
                      fontWeight: '200',
                      lineHeight: 'normal'
                    }}
                  >
                    March 29th, 9:00 P.M.
                  </span>
                </div>

                {/* Title */}
                <div
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    width: '192px',
                    height: '17px',
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '24px',
                    fontWeight: '800',
                    lineHeight: 'normal'
                  }}
                >
                  EVENT TITLE
                </div>
              </div>
            </div>

            {/* Right - CTA */}
            <div
              style={{
                display: 'flex',
                width: '72px',
                height: '26px',
                padding: '13px 12px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '37px',
                background: 'rgba(38, 38, 38, 0.80)',
                cursor: 'pointer'
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

      {/* Frame 13 - Title Section */}
      <div
        style={{
          position: 'absolute',
          left: '319px',
          top: '405px',
          display: 'flex',
          width: '825px',
          justifyContent: 'space-between',
          alignItems: 'center',
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

        {/* Frame 17 - Right info */}
        <div
          style={{
            display: 'flex',
            width: '299px',
            height: '32px',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          {/* Event Title */}
          <div
            style={{
              display: 'flex',
              height: '17px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'stretch',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '24px',
              fontWeight: '800',
              lineHeight: 'normal'
            }}
          >
            Text us
          </div>

          {/* Date */}
          <div
            style={{
              display: 'flex',
              height: '11px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'stretch',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '10px',
              fontWeight: '300',
              lineHeight: 'normal'
            }}
          >
            Exclusive events, contests, and more
          </div>
        </div>
      </div>

      {/* B2B LOGO - Bottom */}
      <img
        src="/images/figma-exact/b2b-logo-bottom.svg"
        alt="B2B LOGO"
        style={{
          position: 'absolute',
          left: '277px',
          top: '749px',
          width: '901px',
          height: '281px',
          fill: '#101010',
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
        }}
      />
      
      {/* Phone Number Form */}
      <div 
        style={{
          position: 'absolute',
          left: '838px',
          top: '448px',
          display: 'inline-flex',
          height: '453px',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        {/* Phone Number Input */}
        <div 
          style={{
            display: 'flex',
            width: '299px',
            height: '36px',
            padding: '0px 2px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '31px',
            background: '#232323'
          }}
        >
          {/* Frame 19 */}
          <div 
            style={{
              display: 'flex',
              width: '294px',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {/* Phone number Field */}
            <div 
              style={{
                display: 'flex',
                width: '233px',
                height: '30px',
                alignItems: 'center',
                gap: '10px',
                paddingLeft: '10px',
                borderRadius: '100px',
                background: '#303030'
              }}
            >
              {/* flag/US */}
              <div 
                style={{
                  width: '23px',
                  height: '15px',
                  background: '#FFFFFF'
                }}
              >
                <svg width="23" height="15" viewBox="0 0 23 15" fill="none">
                  <rect width="23" height="15" fill="#FFFFFF"/>
                  <rect width="23" height="1" y="1" fill="#D80027"/>
                  <rect width="23" height="1" y="3" fill="#D80027"/>
                  <rect width="23" height="1" y="5" fill="#D80027"/>
                  <rect width="23" height="1" y="7" fill="#D80027"/>
                  <rect width="23" height="1" y="9" fill="#D80027"/>
                  <rect width="23" height="1" y="11" fill="#D80027"/>
                  <rect width="23" height="1" y="13" fill="#D80027"/>
                  <rect width="11.5" height="8.07" fill="#2E52B2"/>
                </svg>
              </div>
              
              {/* Phone Number Field Text */}
              <span 
                style={{
                  width: '190px',
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: 'normal'
                }}
              >
                (555)-434-43904
              </span>
            </div>
            
            {/* SEND Button */}
            <div 
              style={{
                display: 'flex',
                width: '51px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                padding: '13px 12px',
                borderRadius: '100px',
                background: '#00FF40',
                cursor: 'pointer'
              }}
            >
              <span 
                style={{
                  color: '#232323',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: '700',
                  lineHeight: 'normal'
                }}
              >
                SEND
              </span>
            </div>
          </div>
        </div>
        
        {/* Disclaimer Text */}
        <div 
          style={{
            width: '299.66px',
            color: '#FFF',
            textAlign: 'justify',
            fontFamily: 'Inter',
            fontSize: '8px',
            fontWeight: '500',
            lineHeight: 'normal',
            letterSpacing: '-0.48px',
            opacity: '0.46',
            textDecoration: 'underline'
          }}
        >
          By submitting my information, I agree to receive recurring automated messages to the contact information provided and to Bounce2Bounce's Terms of Service, Cookie Policy and Privacy Policy. Msg & Data Rates may apply. Reply STOP to cancel, HELP for help.
        </div>
      </div>
      
      {/* Frame 18 - Event List Container */}
      <div 
        style={{
          position: 'absolute',
          left: '313px',
          top: '448px',
          display: 'flex',
          gap: '18px'
        }}
      >
        {/* Event List */}
        <div 
          style={{
            display: 'flex',
            width: '507px',
            height: '453px',
            flexDirection: 'column',
            justifyContent: 'stretch',
            alignItems: 'stretch',
            gap: '21px'
          }}
        >
          {/* EVENT LIST Grid */}
          <div 
            style={{
              display: 'flex',
              alignSelf: 'stretch',
              flexWrap: 'wrap',
              gap: '7px',
              flex: '1'
            }}
          >
            {/* EventCard_small instances - All 8 cards from Figma */}
            {[
              { id: '22:176', text: 'Event Title 1' },
              { id: '22:146', text: 'Event Title 2' },
              { id: '32:1195', text: 'Event Title 3' },
              { id: '32:1223', text: 'Event Title 4' },
              { id: '32:1447', text: 'Event Title 5' },
              { id: '32:1475', text: 'Event Title 6' },
              { id: '32:1503', text: 'Event Title 7' },
              { id: '32:1531', text: 'Event Title 8' }
            ].map((card) => (
              <div
                key={card.id}
                className="eventcardsmall"
                style={{
                  display: 'flex',
                  width: '250px',
                  height: '85px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '16px',
                  background: '#232323',
                  position: 'relative'
                }}
              >
                {/* Group 1 - Complete Event Card Content */}
                <div
                  style={{
                    width: '250px',
                    height: '85px',
                    position: 'relative'
                  }}
                >
                  {/* Frame 6 - Image Section */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '84px',
                      height: '84px',
                      left: '0px',
                      top: '1px'
                    }}
                  >
                    {/* Rectangle 2 - Event Background Image */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '3px',
                        top: '2px',
                        width: '79.04px',
                        height: '79.04px',
                        borderRadius: '14px',
                        background: `url(/images/figma-exact/event-card-bg.png) lightgray 0px 0px / 100% 100% no-repeat`
                      }}
                    />

                    {/* Frame 7 - Date Badge Container */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '55.64px',
                        top: '6px',
                        width: '21px',
                        height: '21px'
                      }}
                    >
                      {/* Rectangle 1 - White Badge Background */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '0.15px',
                          top: '-0.86px',
                          width: '21.16px',
                          height: '21.16px',
                          borderRadius: '4px',
                          background: '#FFF'
                        }}
                      />

                      {/* Date Badge Content */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '3.36px',
                          top: '3px',
                          display: 'flex',
                          width: '15px',
                          height: '14px',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '2px'
                        }}
                      >
                        {/* DAY Number */}
                        <span
                          style={{
                            color: '#000',
                            textAlign: 'center',
                            fontFamily: 'Inter',
                            fontSize: '10px',
                            fontWeight: '800',
                            lineHeight: 'normal'
                          }}
                        >
                          02
                        </span>

                        {/* MONTH Abbreviation */}
                        <span
                          style={{
                            color: '#000',
                            textAlign: 'center',
                            fontFamily: 'Inter',
                            fontSize: '6px',
                            fontWeight: '800',
                            lineHeight: 'normal'
                          }}
                        >
                          SEP
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Frame 4 - Text Content Section */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '94px',
                      top: '0px',
                      display: 'flex',
                      width: '156px',
                      height: '85px',
                      padding: '3px 0px',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}
                  >
                    {/* Frame 3 - Event Information */}
                    <div
                      style={{
                        display: 'flex',
                        height: '53px',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        alignSelf: 'stretch'
                      }}
                    >
                      {/* Event Title */}
                      <div
                        style={{
                          display: 'flex',
                          width: '128px',
                          height: '20px',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          color: '#FFF',
                          fontFamily: 'Inter',
                          fontSize: '16px',
                          fontWeight: '800',
                          lineHeight: 'normal'
                        }}
                      >
                        {card.text}
                      </div>

                      {/* DATE Information Row */}
                      <div
                        style={{
                          display: 'flex',
                          height: '15px',
                          paddingLeft: '1px',
                          alignItems: 'center',
                          gap: '4px',
                          alignSelf: 'stretch'
                        }}
                      >
                        {/* Calendar Icon SVG */}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8" stroke="#FFF" strokeWidth="1"/>
                        </svg>

                        {/* Date Text */}
                        <span
                          style={{
                            display: 'flex',
                            width: '111px',
                            height: '12px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '10px',
                            fontWeight: '200',
                            lineHeight: 'normal'
                          }}
                        >
                          Tue, Sep 02 @ 10:00PM
                        </span>
                      </div>

                      {/* LOCATION Information Row */}
                      <div
                        style={{
                          display: 'flex',
                          height: '15px',
                          padding: '0px 1px',
                          alignItems: 'center',
                          gap: '4px',
                          alignSelf: 'stretch'
                        }}
                      >
                        {/* Location Icon SVG */}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" stroke="#FFF" strokeWidth="1"/>
                          <circle cx="5" cy="4" r="1" fill="#FFF"/>
                        </svg>

                        {/* Location Text */}
                        <span
                          style={{
                            display: 'flex',
                            width: '111px',
                            height: '12px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '10px',
                            fontWeight: '200',
                            lineHeight: 'normal'
                          }}
                        >
                          Venue Address
                        </span>
                      </div>
                    </div>

                    {/* Frame 9 - Action Buttons Section */}
                    <div
                      style={{
                        display: 'flex',
                        height: '26px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'stretch'
                      }}
                    >
                      {/* Card Buttons Container */}
                      <div
                        style={{
                          display: 'flex',
                          width: '156px',
                          paddingRight: '4px',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          alignSelf: 'stretch',
                          gap: '4px'
                        }}
                      >
                        {/* Get Tickets Button */}
                        <div
                          style={{
                            display: 'flex',
                            width: '155px',
                            height: '26px',
                            padding: '13px 12px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            borderRadius: '37px',
                            background: 'rgba(23, 23, 23, 0.80)',
                            cursor: 'pointer'
                          }}
                        >
                          <span
                            style={{
                              color: '#FFF',
                              fontFamily: 'Inter',
                              fontSize: '12px',
                              fontWeight: '500',
                              lineHeight: 'normal'
                            }}
                          >
                            Get Tickets
                          </span>
                        </div>

                        {/* SHARE Button */}
                        <div
                          style={{
                            width: '26px',
                            height: '25px',
                            borderRadius: '14px',
                            background: '#FFF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <svg width="15.41" height="15.37" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1l7 7-7 7M15 8H1" stroke="#000" strokeWidth="1"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigmaDesktop;
