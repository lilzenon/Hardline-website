import React, { useState } from 'react';
import { sanitizeUserInput, sanitizeFormData } from '../utils/sanitizer';
import { secureApiRequest } from '../utils/security';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: 'info@hardline.events',
    password: '',
    totpCode: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValidated, setEmailValidated] = useState(true);
  const [step, setStep] = useState('login'); // 'login', 'totp', 'setup-totp'
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Exact Figma design specifications
  const styles = {
    // FRAME: login (428px × 926px)
    loginFrame: {
      width: '428px',
      height: '926px',
      background: '#FFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 38px 40px 38px',
      boxSizing: 'border-box',
      margin: '0 auto'
    },

    // B2B Logo container
    logoContainer: {
      marginBottom: '80px',
      display: 'flex',
      justifyContent: 'center'
    },

    // VECTOR: B2B LOGO (138.406px × 43px)
    logo: {
      width: '138.406px',
      height: '43px'
    },

    // Main body container (352px width from Figma)
    mainBody: {
      width: '352px',
      display: 'flex',
      flexDirection: 'column'
    },

    // TEXT: Login (30px Hamon font) - LEFT ALIGNED per Figma
    loginTitle: {
      color: '#2A2A2A',
      textAlign: 'left', // LEFT ALIGNED as per Figma design
      fontFamily: 'Hamon, Inter, sans-serif',
      fontSize: '30px',
      fontWeight: '700',
      lineHeight: '28px',
      letterSpacing: '0.9px',
      marginBottom: '8px',
      margin: '0 0 8px 0'
    },

    // Login subtitle (missing from original design)
    loginSubtitle: {
      color: '#666',
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '24px',
      textAlign: 'left',
      marginBottom: '32px'
    },

    // Username field label
    fieldLabel: {
      color: '#2A2A2A',
      fontFamily: 'Hamon, Inter, sans-serif',
      fontSize: '16.427px',
      fontWeight: '400',
      lineHeight: '25.814px',
      letterSpacing: '0.821px',
      marginBottom: '8px',
      textAlign: 'left'
    },

    // Form section container
    formSection: {
      width: '352px',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '32px'
    },

    // RECTANGLE: Input fields (352px × 56.325px from Figma)
    inputField: {
      width: '352px',
      height: '56.325px',
      borderRadius: '17.601px',
      border: '1.173px solid #D1D1D1',
      background: '#FDFDFD',
      fontFamily: 'Inter, sans-serif',
      fontSize: '16.427px',
      fontWeight: '400',
      color: '#2A2A2A',
      padding: '0 20px',
      outline: 'none',
      boxSizing: 'border-box',
      marginBottom: '16px',
      letterSpacing: '0.821px'
    },

    // Password field container
    passwordContainer: {
      position: 'relative',
      marginBottom: '16px'
    },

    // Forgot password link
    forgotPassword: {
      color: '#2A2A2A',
      fontFamily: 'Hamon, Inter, sans-serif',
      fontSize: '16.427px',
      fontWeight: '400',
      lineHeight: '25.814px',
      letterSpacing: '0.821px',
      textAlign: 'left',
      textDecoration: 'none',
      marginBottom: '24px',
      display: 'block'
    },

    // RECTANGLE: Login button (352px × 56.325px)
    loginButton: {
      width: '352px',
      height: '56.325px',
      borderRadius: '17.601px',
      background: '#151515',
      border: 'none',
      color: '#FFF',
      textAlign: 'center',
      fontFamily: 'Hamon, Inter, sans-serif',
      fontSize: '18.774px',
      fontWeight: '700',
      lineHeight: '16.427px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s ease',
      marginBottom: '32px'
    },

    // Social login section (positioned AFTER login form per Figma)
    socialSection: {
      width: '352px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18.774px'
    },

    // RECTANGLE: Social buttons (352px × 56.325px)
    socialButton: {
      width: '352px',
      height: '56.325px',
      borderRadius: '17.601px',
      border: '1.173px solid #D1D1D1',
      background: '#FDFDFD',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      fontFamily: 'Hamon, Inter, sans-serif',
      fontSize: '16.427px',
      fontWeight: '400',
      color: '#2A2A2A',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box'
    },

    // Error alert styling
    errorAlert: {
      backgroundColor: '#FEF2F2',
      border: '1px solid #FECACA',
      borderRadius: '8px',
      padding: '12px 16px',
      marginBottom: '16px',
      color: '#DC2626',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif'
    },

    // Loading spinner
    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid #ffffff40',
      borderTop: '2px solid #ffffff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },

    // TOTP Modal/Section (352px width, centered)
    totpSection: {
      width: '352px',
      textAlign: 'center',
      marginTop: '20px',
      padding: '24px',
      backgroundColor: '#FDFDFD',
      borderRadius: '17.601px',
      border: '1.173px solid #D1D1D1',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },

    totpTitle: {
      fontFamily: 'Hamon, Inter, sans-serif',
      fontSize: '24px',
      fontWeight: '700',
      color: '#2A2A2A',
      marginBottom: '16px',
      margin: '0 0 16px 0'
    },

    totpDescription: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      color: '#666',
      marginBottom: '20px',
      lineHeight: '1.4',
      textAlign: 'left'
    },

    qrCodeContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      padding: '16px',
      backgroundColor: '#FFF',
      borderRadius: '12px',
      border: '1px solid #E0E0E0'
    },

    totpInputField: {
      width: '100%',
      height: '56.325px',
      borderRadius: '17.601px',
      border: '1.173px solid #D1D1D1',
      background: '#FFF',
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      fontWeight: '600',
      color: '#2A2A2A',
      textAlign: 'center',
      letterSpacing: '4px',
      padding: '0 20px',
      outline: 'none',
      boxSizing: 'border-box',
      marginBottom: '16px'
    },

    totpButton: {
      width: '100%',
      height: '56.325px',
      borderRadius: '17.601px',
      background: '#151515',
      border: 'none',
      color: '#FFF',
      textAlign: 'center',
      fontFamily: 'Hamon, Inter, sans-serif',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Sanitize input to prevent XSS attacks
    const sanitizedValue = sanitizeUserInput(value);

    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
    // Implement social login logic here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      let endpoint = '/api/auth/admin/login';

      if (step === 'totp') {
        endpoint = '/api/auth/admin/verify-totp';
      } else if (step === 'setup-totp') {
        endpoint = '/api/auth/admin/totp/complete';
      }

      // Sanitize form data before sending
      const sanitizedFormData = sanitizeFormData(formData);
      const requestBody = step === 'setup-totp'
        ? { totpCode: sanitizedFormData.totpCode }
        : sanitizedFormData;

      const response = await secureApiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      console.log('Login response:', { status: response.status, data });

      if (response.ok) {
        if (data.requireTotp) {
          console.log('TOTP verification required');
          setStep('totp');
        } else if (data.success) {
          console.log('Login successful, checking TOTP setup need:', data.needsTotpSetup);
          
          // Check if user needs TOTP setup after successful login
          if (data.needsTotpSetup) {
            console.log('TOTP setup required, generating QR code...');
            // Generate TOTP setup data
            try {
              const setupResponse = await fetch('/api/auth/admin/totp/generate', {
                method: 'GET',
                credentials: 'include'
              });
              
              console.log('TOTP setup response:', setupResponse.status);
              
              if (setupResponse.ok) {
                const setupData = await setupResponse.json();
                console.log('TOTP setup data received:', setupData);
                setQrCodeUrl(setupData.qrCode);
                setStep('setup-totp');
              } else {
                console.error('TOTP setup failed, redirecting to dashboard');
                const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/dashboard';
                window.location.href = returnTo;
              }
            } catch (error) {
              console.error('TOTP setup error:', error);
              const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/dashboard';
              window.location.href = returnTo;
            }
          } else {
            console.log('No TOTP setup needed, redirecting to dashboard');
            // Normal login success, redirect to dashboard
            const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/dashboard';
            window.location.href = returnTo;
          }
        } else if (step === 'setup-totp' && data.success) {
          console.log('TOTP setup completed successfully, redirecting to dashboard');
          const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/dashboard';
          window.location.href = returnTo;
        } else if (step === 'totp' && data.success) {
          console.log('TOTP verification successful, redirecting to dashboard');
          const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/dashboard';
          window.location.href = returnTo;
        } else {
          console.log('Login response success but no success flag, redirecting anyway');
          const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/dashboard';
          window.location.href = returnTo;
        }
      } else {
        // Ensure error message is always a string
        const errorMessage = typeof data.error === 'string' ? data.error : 
                           typeof data.message === 'string' ? data.message : 
                           'Login failed';
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.loginFrame}>
      {/* VECTOR: B2B LOGO (138.406px × 43px) */}
      <div style={styles.logoContainer}>
        <img 
          src="/images/b2b-logo.svg" 
          alt="Hardline Logo" 
          style={styles.logo}
        />
      </div>

      {/* Main Body Container (352px width) */}
      <div style={styles.mainBody}>
        {/* TEXT: Login (30px Hamon font) - LEFT ALIGNED */}
        <h1 style={styles.loginTitle}>Login</h1>
        
        {/* Login subtitle */}
        <p style={styles.loginSubtitle}>
          Welcome back! Please enter your details.
        </p>

        {step === 'login' && (
          <>
            {/* Login Form Section - FIRST per Figma design */}
            <div style={styles.formSection}>
              <form onSubmit={handleSubmit}>
                {errors.general && (
                  <div style={styles.errorAlert}>
                    {String(errors.general)}
                  </div>
                )}

                {/* Username field */}
                <div>
                  <label style={styles.fieldLabel}>Enter your username</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={styles.inputField}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Password field */}
                <div style={styles.passwordContainer}>
                  <label style={styles.fieldLabel}>Enter your password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={styles.inputField}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    autoComplete="current-password"
                    required
                  />
                </div>

                {/* Forgot password link */}
                <a href="#" style={styles.forgotPassword}>forgot password?</a>

                {/* Login button */}
                <button
                  type="submit"
                  style={styles.loginButton}
                  disabled={isLoading || !emailValidated}
                >
                  {isLoading ? (
                    <>
                      <div style={styles.spinner}></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>
            </div>

            {/* Social Login Section - AFTER login form per Figma */}
            <div style={styles.socialSection}>
              {/* Google button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                style={styles.socialButton}
                disabled={isLoading}
              >
                <svg width="28.16" height="28.162" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Apple button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                style={styles.socialButton}
                disabled={isLoading}
              >
                <svg width="23.47" height="23.47" viewBox="0 0 24 24" fill="none">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#000"/>
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>
          </>
        )}

        {step === 'totp' && (
          <div style={styles.totpSection}>
            <h2 style={styles.totpTitle}>Enter Authentication Code</h2>
            <p style={styles.totpDescription}>
              Please enter the 6-digit code from your Google Authenticator app
            </p>
            
            <form onSubmit={handleSubmit}>
              {errors.general && (
                <div style={styles.errorAlert}>
                  {String(errors.general)}
                </div>
              )}
              
              <input
                type="text"
                name="totpCode"
                value={formData.totpCode}
                onChange={handleInputChange}
                style={styles.totpInputField}
                placeholder="000000"
                maxLength="6"
                pattern="[0-9]{6}"
                disabled={isLoading}
                autoComplete="one-time-code"
                required
              />
              
              <button
                type="submit"
                style={styles.totpButton}
                disabled={isLoading || formData.totpCode.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>
          </div>
        )}

        {step === 'setup-totp' && (
          <div style={styles.totpSection}>
            <h2 style={styles.totpTitle}>Setup Two-Factor Authentication</h2>
            <p style={styles.totpDescription}>
              Scan this QR code with your Google Authenticator app, then enter the 6-digit code to complete setup.
            </p>
            
            {qrCodeUrl && (
              <div style={styles.qrCodeContainer}>
                <img src={qrCodeUrl} alt="QR Code for TOTP setup" />
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {errors.general && (
                <div style={styles.errorAlert}>
                  {String(errors.general)}
                </div>
              )}
              
              <input
                type="text"
                name="totpCode"
                value={formData.totpCode}
                onChange={handleInputChange}
                style={styles.totpInputField}
                placeholder="000000"
                maxLength="6"
                pattern="[0-9]{6}"
                disabled={isLoading}
                autoComplete="one-time-code"
                required
              />
              
              <button
                type="submit"
                style={styles.totpButton}
                disabled={isLoading || formData.totpCode.length !== 6}
              >
                {isLoading ? 'Setting up...' : 'Complete Setup'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
