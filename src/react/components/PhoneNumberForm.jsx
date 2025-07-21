import React, { useState } from 'react';

const PhoneNumberForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Phone number submitted:', phoneNumber);
  };

  return (
    <div
      className="phone-number-form inline-flex flex-col items-center"
      style={{
        height: '453px',
        gap: '4px'
      }}
    >

      {/* Phone Number Input */}
      <div
        className="phone-number flex flex-col justify-between items-center"
        style={{
          width: '299px',
          height: '36px',
          padding: '0px 2px',
          borderRadius: '31px',
          background: '#232323'
        }}
      >

        {/* Frame 19 */}
        <div
          className="frame-19 flex justify-between items-center"
          style={{
            width: '294px',
            gap: '10px'
          }}
        >

          {/* Phone Number Field */}
          <div
            className="phone-number-field flex items-center"
            style={{
              width: '233px',
              height: '30px',
              paddingLeft: '10px',
              gap: '10px',
              borderRadius: '100px',
              background: '#303030'
            }}
          >

            {/* US Flag */}
            <div
              className="flagus"
              style={{
                width: '23px',
                height: '15px'
              }}
            >
              <svg width="23" height="15" viewBox="0 0 23 15" fill="none">
                <rect width="23" height="15" rx="2" fill="#FFF"/>
                <rect width="23" height="1" y="1" fill="#B22234"/>
                <rect width="23" height="1" y="3" fill="#B22234"/>
                <rect width="23" height="1" y="5" fill="#B22234"/>
                <rect width="23" height="1" y="7" fill="#B22234"/>
                <rect width="23" height="1" y="9" fill="#B22234"/>
                <rect width="23" height="1" y="11" fill="#B22234"/>
                <rect width="23" height="1" y="13" fill="#B22234"/>
                <rect width="9" height="8" fill="#3C3B6E"/>
              </svg>
            </div>

            {/* Phone Input */}
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              style={{
                width: '190px',
                background: 'transparent',
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: 'normal',
                border: 'none',
                outline: 'none'
              }}
            />

          </div>

          {/* Submit Button */}
          <div
            className="item flex justify-center items-center cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              width: '51px',
              height: '36px',
              padding: '13px 12px',
              gap: '10px',
              borderRadius: '100px',
              background: '#00FF40'
            }}
            onClick={handleSubmit}
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
              GO
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
          lineHeight: '1.21em',
          letterSpacing: '-0.48px',
          opacity: '0.46',
          textDecoration: 'underline',
          marginTop: '16px'
        }}
      >
        By submitting my information, I agree to receive recurring automated messages to the contact information provided and to Bounce2Bounce's Terms of Service, Cookie Policy and Privacy Policy. Msg & Data Rates may apply. Reply STOP to cancel, HELP for help.
      </div>

    </div>
  );
};

export default PhoneNumberForm;
