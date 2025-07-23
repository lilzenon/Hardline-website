import React, { useState, useCallback } from 'react';

const TestVerification = () => {
  const [showVerification, setShowVerification] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationPhone, setVerificationPhone] = useState('');
  const [phoneSubmitting, setPhoneSubmitting] = useState(false);
  const [verificationSubmitting, setVerificationSubmitting] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [phoneInputState, setPhoneInputState] = useState('normal');
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // Phone submission handler
  const handlePhoneSubmit = useCallback(async () => {
    if (!phoneNumber.trim() || phoneSubmitting) return;

    try {
      setPhoneSubmitting(true);
      setPhoneInputState('loading');

      const response = await fetch('/api/home-settings/submit-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber,
          countryCode: '+1'
        })
      });

      const result = await response.json();

      if (response.ok && result.success && result.requiresVerification) {
        setPhoneInputState('valid');
        setVerificationPhone(phoneNumber);
        setTimeout(() => setShowVerification(true), 500);
      }
    } catch (error) {
      console.error('Error:', error);
      setPhoneInputState('invalid');
    } finally {
      setPhoneSubmitting(false);
    }
  }, [phoneNumber, phoneSubmitting]);

  // Verification submission handler
  const handleVerificationSubmit = useCallback(async () => {
    if (verificationCode.length !== 4 || verificationSubmitting) return;

    try {
      setVerificationSubmitting(true);
      setPhoneInputState('loading');

      const response = await fetch('/api/home-settings/verify-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: verificationPhone,
          code: verificationCode
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setPhoneInputState('valid');
        setPhoneSubmitted(true);
        setTimeout(() => {
          setShowVerification(false);
          setVerificationCode('');
          setVerificationPhone('');
          setPhoneNumber('');
          setPhoneSubmitted(false);
          setPhoneInputState('normal');
        }, 3000);
      } else {
        setPhoneInputState('invalid');
      }
    } catch (error) {
      console.error('Error:', error);
      setPhoneInputState('invalid');
    } finally {
      setVerificationSubmitting(false);
    }
  }, [verificationCode, verificationSubmitting, verificationPhone]);

  // Button press handlers
  const handleButtonMouseDown = () => setIsButtonPressed(true);
  const handleButtonMouseUp = () => setIsButtonPressed(false);
  const handleBackToPhone = () => {
    setShowVerification(false);
    setVerificationCode('');
    setPhoneInputState('normal');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px',
      padding: '40px',
      background: '#000',
      minHeight: '100vh',
      color: '#FFF',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1>Test Verification UI</h1>
      <p>Use phone number: 5555555555 and code: 1234</p>
      
      {/* Container */}
      <div style={{
        display: 'flex',
        width: '300px',
        height: showVerification ? '200px' : '60px',
        padding: '10px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '30px',
        background: '#232323',
        transition: 'height 0.5s ease-in-out',
        position: 'relative'
      }}>
        {showVerification ? (
          /* Verification UI */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            width: '100%'
          }}>
            <button 
              onClick={handleBackToPhone}
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                color: '#FFF',
                cursor: 'pointer'
              }}
            >←</button>
            
            <div style={{ fontSize: '16px', fontWeight: '600' }}>Enter Code</div>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>Sent to {verificationPhone}</div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={verificationCode[index] || ''}
                  onChange={(e) => {
                    const newCode = verificationCode.split('');
                    newCode[index] = e.target.value.replace(/\D/g, '');
                    setVerificationCode(newCode.join(''));
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#FFF',
                    fontSize: '18px',
                    textAlign: 'center',
                    outline: 'none'
                  }}
                />
              ))}
            </div>
            
            <button
              onClick={handleVerificationSubmit}
              onMouseDown={handleButtonMouseDown}
              onMouseUp={handleButtonMouseUp}
              style={{
                background: '#00FF40',
                border: 'none',
                borderRadius: '20px',
                padding: '10px 20px',
                color: '#000',
                fontWeight: '700',
                cursor: 'pointer',
                transform: isButtonPressed ? 'scale(0.96)' : 'scale(1)',
                transition: 'transform 0.1s ease'
              }}
            >
              {verificationSubmitting ? 'Verifying...' : 'VERIFY'}
            </button>
          </div>
        ) : (
          /* Phone Input UI */
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%'
          }}>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              style={{
                flex: 1,
                background: '#303030',
                border: 'none',
                borderRadius: '15px',
                padding: '10px',
                color: '#FFF',
                outline: 'none'
              }}
            />
            <button
              onClick={handlePhoneSubmit}
              onMouseDown={handleButtonMouseDown}
              onMouseUp={handleButtonMouseUp}
              style={{
                background: '#00FF40',
                border: 'none',
                borderRadius: '15px',
                padding: '10px 15px',
                color: '#000',
                fontWeight: '700',
                cursor: 'pointer',
                transform: isButtonPressed ? 'scale(0.96)' : 'scale(1)',
                transition: 'transform 0.1s ease'
              }}
            >
              {phoneSubmitting ? '...' : 'SEND'}
            </button>
          </div>
        )}
      </div>
      
      {phoneSubmitted && (
        <div style={{ color: '#00FF40', fontWeight: '600' }}>
          ✓ Phone verified successfully!
        </div>
      )}
    </div>
  );
};

export default TestVerification;
