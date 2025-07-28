import React, { useState } from 'react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: 'info@bounce2bounce.com', // Default admin email
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValidated, setEmailValidated] = useState(true); // Start validated since we have default email

  // Inline styles based on exact Figma design (428px × 926px frame)
  const styles = {
    loginFrame: {
      width: '428px',
      height: '926px',
      background: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '80px 38px 40px 38px', // Center the 352px content within 428px frame
      boxSizing: 'border-box',
      margin: '0 auto',
      minHeight: '100vh'
    },
    // B2B Logo (138.406px × 43px)
    logoContainer: {
      marginBottom: '40px',
      textAlign: 'center'
    },
    logo: {
      width: '138.406px',
      height: '43px',
      fill: '#000000'
    },
    // Login Title (Hamon, 30px, #2A2A2A)
    loginTitle: {
      color: '#2A2A2A',
      textAlign: 'center',
      fontFamily: 'Hamon, Inter, sans-serif',
      fontSize: '30px',
      fontWeight: '700',
      lineHeight: '28px',
      letterSpacing: '0.9px',
      margin: '0 0 40px 0'
    },
    // Main Body (352px × 450.037px)
    mainBody: {
      width: '352px',
      height: '450.037px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px' // Space between social buttons and form
    },
    // Social Login Buttons Section (352px × 131.424px)
    socialLoginSection: {
      width: '352px',
      height: '131.424px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18.774px', // Space between Google and Apple buttons
      marginBottom: '18px'
    },
    // Social Button (352px × 56.325px, border-radius: 17.601px)
    socialButton: {
      width: '352px',
      height: '56.325px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      borderRadius: '17.601px',
      border: '1.173px solid #D1D1D1',
      background: '#FDFDFD',
      fontFamily: 'Hamon, Inter, sans-serif',
      fontSize: '16.427px',
      fontWeight: '400',
      color: '#2A2A2A',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box'
    },
    // Login Form Section (352px × 301.938px)
    loginForm: {
      width: '352px',
      height: '301.938px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    // Input Field (352px × 56.325px)
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
      transition: 'all 0.2s ease',
      boxSizing: 'border-box',
      letterSpacing: '0.821px'
    },
    // Login Button (352px × 56.325px)
    loginButton: {
      width: '352px',
      height: '56.325px',
      borderRadius: '17.601px',
      background: '#151515',
      border: 'none',
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'Hamon, Inter, sans-serif',
      fontSize: '18.774px',
      fontWeight: '700',
      lineHeight: '16.427px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '16px'
    },
    // Error Alert
    errorAlert: {
      padding: '12px 16px',
      backgroundColor: 'rgba(234, 67, 92, 0.1)',
      border: '1px solid rgba(234, 67, 92, 0.3)',
      borderRadius: '12px',
      color: '#EA435C',
      fontSize: '14px',
      marginBottom: '16px',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif'
    },
    // Password Container with Eye Icon
    passwordContainer: {
      position: 'relative',
      width: '352px',
      height: '56.325px'
    },
    passwordToggle: {
      position: 'absolute',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      width: '19.947px',
      height: '12.908px',
      color: '#C4C4C4'
    },
    // Email Validation Icon (16.427px × 16.428px)
    validationIcon: {
      position: 'absolute',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16.427px',
      height: '16.428px',
      backgroundColor: '#4CAF50',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    checkIcon: {
      width: '9px',
      height: '7px'
    },
    // Forgot Password Link
    forgotPassword: {
      color: '#2A2A2A',
      fontFamily: 'Hamon, Inter, sans-serif',
      fontSize: '16.427px',
      fontWeight: '400',
      lineHeight: '25.814px',
      letterSpacing: '0.821px',
      textAlign: 'right',
      textDecoration: 'none',
      marginTop: '8px',
      cursor: 'pointer'
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Email validation
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValidated(emailRegex.test(value));
    }

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Use the correct admin login endpoint
      const response = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Redirect to dashboard on success
        const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/dashboard';
        window.location.href = returnTo;
      } else {
        const data = await response.json();
        setErrors({ general: data.error || data.message || 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div style={styles.loginFrame}>
      {/* B2B Logo (138.406px × 43px) */}
      <div style={styles.logoContainer}>
        <svg style={styles.logo} viewBox="0 0 138.406 43" fill="none">
          <rect width="138.406" height="43" fill="#000"/>
          <text x="69.203" y="30" textAnchor="middle" fill="#FFF" fontSize="24" fontFamily="Hamon, Inter, sans-serif" fontWeight="700">B2B</text>
        </svg>
      </div>

      {/* Login Title (Hamon, 30px, #2A2A2A) */}
      <h1 style={styles.loginTitle}>Login</h1>

      {/* Main Body (352px × 450.037px) */}
      <div style={styles.mainBody}>
        {/* Social Login Buttons Section (352px × 131.424px) */}
        <div style={styles.socialLoginSection}>
          {/* Google Button (352px × 56.325px) */}
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

          {/* Apple Button (352px × 56.325px) */}
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

        {/* Login Form Section (352px × 301.938px) */}
        <form onSubmit={handleSubmit} style={styles.loginForm}>
          {errors.general && (
            <div style={styles.errorAlert}>
              {errors.general}
            </div>
          )}

          {/* Username/Email Field (352px × 91.527px) */}
          <div style={{ position: 'relative' }}>
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
            {emailValidated && formData.email && (
              <div style={styles.validationIcon}>
                <svg style={styles.checkIcon} viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>

          {/* Password Field (352px × 127px) */}
          <div>
            <div style={styles.passwordContainer}>
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
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg width="19.947" height="12.908" viewBox="0 0 24 24" fill="currentColor">
                  {showPassword ? (
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  ) : (
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                  )}
                </svg>
              </button>
            </div>

            {/* Forgot Password Link */}
            <a href="#" style={styles.forgotPassword} onClick={(e) => { e.preventDefault(); alert('Contact admin for password reset'); }}>
              forgot password?
            </a>
          </div>

          {/* Login Button (352px × 56.325px) */}
          <button
            type="submit"
            style={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid #FFFFFF',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}>
                </div>
                <span>Signing in...</span>
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
