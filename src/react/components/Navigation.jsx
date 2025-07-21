import React from 'react';

const Navigation = () => {
  return (
    <div
      className="frame-12 flex justify-between items-center"
      style={{
        width: '830px',
        height: '48px',
        paddingLeft: '10px',
        gap: '500px'
      }}
    >
      {/* Group 4 - B2B Logo */}
      <div
        className="group-4"
        style={{
          width: '138.41px',
          height: '43px'
        }}
      >
        <img
          src="/images/figma/b2b-logo-nav.svg"
          alt="B2B Logo"
          style={{
            width: '138.41px',
            height: '43px'
          }}
        />
      </div>

      {/* Group 5 - Navigation Pills */}
      <div
        className="group-5"
        style={{
          width: '226.49px',
          height: '34px'
        }}
      >
        <div
          className="pages flex justify-center items-center"
          style={{
            width: '226.49px',
            height: '34px',
            padding: '3.606px',
            gap: '2.022px',
            borderRadius: '12px',
            background: '#232323',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
          }}
        >

          {/* Events Button - Active */}
          <div
            className="events flex justify-center items-center cursor-pointer"
            style={{
              width: '71.771px',
              height: '26.788px',
              padding: '13px 12px',
              gap: '10px',
              borderRadius: '10px',
              background: '#000',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
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

          {/* About Button */}
          <div
            className="about flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-colors"
            style={{
              width: '71.771px',
              height: '26.788px',
              padding: '13px 12px',
              gap: '10px',
              borderRadius: '10px',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
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
              About
            </span>
          </div>

          {/* Contact Button */}
          <div
            className="contact flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-colors"
            style={{
              width: '71.771px',
              height: '26.788px',
              padding: '13px 12px',
              gap: '10px',
              borderRadius: '10px',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
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
              Contact
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navigation;
