import React, { useState, useEffect } from 'react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  // Inline styles based on exact Figma design
  const styles = {
    loginFrame: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      fontFamily: "'Inter', sans-serif",
      padding: '40px 20px'
    },
    logoContainer: {
      marginBottom: '40px',
      textAlign: 'center'
    },
    logoText: {
      fontFamily: "'Hamon', 'Inter', sans-serif",
      fontSize: '32px',
      fontWeight: '700',
      color: '#2A2A2A',
      marginBottom: '8px'
    },
    logoSubtext: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '12px',
      fontWeight: '400',
      color: 'rgba(42, 42, 42, 0.7)',
      letterSpacing: '3px',
      textTransform: 'uppercase'
    },
    loginTitle: {
      fontFamily: "'Hamon', 'Inter', sans-serif",
      fontSize: '30px',
      fontWeight: '700',
      color: '#2A2A2A',
      marginBottom: '32px',
      textAlign: 'center'
    },
    mainBody: {
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    socialButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      width: '100%',
      padding: '16px 24px',
      backgroundColor: '#FDFDFD',
      border: '1px solid #D1D1D1',
      borderRadius: '17.6px',
      fontFamily: "'Inter', sans-serif",
      fontSize: '16px',
      fontWeight: '500',
      color: '#2A2A2A',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginBottom: '12px'
    },
    inputField: {
      width: '100%',
      padding: '16px 20px',
      backgroundColor: '#FDFDFD',
      border: '1px solid #D1D1D1',
      borderRadius: '17.6px',
      fontFamily: "'Inter', sans-serif",
      fontSize: '16px',
      color: '#2A2A2A',
      outline: 'none',
      transition: 'all 0.2s ease',
      marginBottom: '16px'
    },
    loginButton: {
      width: '100%',
      padding: '16px 24px',
      backgroundColor: '#151515',
      border: 'none',
      borderRadius: '17.6px',
      fontFamily: "'Hamon', 'Inter', sans-serif",
      fontSize: '16px',
      fontWeight: '700',
      color: '#FFFFFF',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '8px'
    },
    errorAlert: {
      padding: '12px 16px',
      backgroundColor: 'rgba(234, 67, 92, 0.1)',
      border: '1px solid rgba(234, 67, 92, 0.3)',
      borderRadius: '12px',
      color: '#EA435C',
      fontSize: '14px',
      marginBottom: '16px',
      textAlign: 'center'
    },
    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid #FFFFFF',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };
  const [emailValidated, setEmailValidated] = useState(false);

  // Check for existing authentication
  useEffect(() => {
    // If user is already authenticated as admin, redirect to dashboard
    fetch('/api/auth/check-admin', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/dashboard';
      }
    })
    .catch(() => {
      // User not authenticated, continue with login
    });
  }, []);

  // Handle rate limiting countdown
  useEffect(() => {
    let interval;
    if (isBlocked && blockTimeRemaining > 0) {
      interval = setInterval(() => {
        setBlockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBlocked, blockTimeRemaining]);

  // Validate email in real-time
  useEffect(() => {
    if (formData.email) {
      const isValid = /\S+@\S+\.\S+/.test(formData.email);
      setEmailValidated(isValid);
    } else {
      setEmailValidated(false);
    }
  }, [formData.email]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/api/auth/${provider}?returnTo=${encodeURIComponent(window.location.search.get('returnTo') || '/dashboard')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success - redirect to dashboard or return URL
        const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/dashboard';
        window.location.href = returnTo;
      } else {
        // Handle different error types
        if (response.status === 429) {
          // Rate limited
          setLoginAttempts(prev => prev + 1);
          if (loginAttempts >= 4) {
            setIsBlocked(true);
            setBlockTimeRemaining(300); // 5 minutes
          }
          setErrors({ general: 'Too many login attempts. Please try again later.' });
        } else if (response.status === 401) {
          setLoginAttempts(prev => prev + 1);
          setErrors({ general: 'Invalid email or password. Please try again.' });
        } else if (response.status === 403) {
          setErrors({ general: 'Access denied. Admin privileges required.' });
        } else {
          setErrors({ general: data.message || 'Login failed. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.loginFrame}>
      {/* B2B Logo */}
      <div style={styles.logoContainer}>
        <div style={styles.logoText}>B2B</div>
        <div style={styles.logoSubtext}>BOUNCE2BOUNCE</div>
      </div>

      {/* Login Title */}
      <h1 style={styles.loginTitle}>Log in to your account</h1>

      {/* Main Body */}
      <div style={styles.mainBody}>
        {/* Social Login Buttons */}
        <div>
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            style={styles.socialButton}
            disabled={isLoading || isBlocked}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('apple')}
            style={styles.socialButton}
            disabled={isLoading || isBlocked}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#000"/>
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {errors.general && (
            <div className={styles.errorAlert}>
              <span>{errors.general}</span>
            </div>
          )}

          {isBlocked && (
            <div className={styles.blockAlert}>
              <span>Account temporarily locked. Try again in {formatTime(blockTimeRemaining)}</span>
            </div>
          )}

          {/* Username/Email Field */}
          <div className={styles.inputSection}>
            <label className={styles.inputLabel}>Enter your username</label>
            <div className={styles.inputContainer}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="user@email.com"
                disabled={isLoading || isBlocked}
                autoComplete="email"
                required
              />
              {emailValidated && (
                <div className={styles.validationIcon}>
                  <div className={styles.validationCircle}></div>
                  <svg className={styles.checkIcon} width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.5L3.5 6L8 1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className={styles.inputSection}>
            <div className={styles.passwordHeader}>
              <label className={styles.inputLabel}>Enter your password</label>
              <button type="button" className={styles.forgotPassword}>forgot password?</button>
            </div>
            <div className={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="**************"
                disabled={isLoading || isBlocked}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeButton}
                disabled={isLoading || isBlocked}
              >
                <svg width="20" height="13" viewBox="0 0 20 13" fill="none">
                  <path d="M10 0C5.45 0 1.73 2.89 0.5 7c1.23 4.11 4.95 7 9.5 7s8.27-2.89 9.5-7c-1.23-4.11-4.95-7-9.5-7zm0 11.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill="#C4C4C4"/>
                </svg>
              </button>
            </div>
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`${styles.loginButton} ${(isLoading || isBlocked) ? styles.buttonDisabled : ''}`}
            disabled={isLoading || isBlocked}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                Authenticating...
              </>
            ) : isBlocked ? (
              'Account Locked'
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Security Footer */}
        <div className={styles.securityFooter}>
          {loginAttempts > 0 && !isBlocked && (
            <div className={styles.attemptsWarning}>
              {5 - loginAttempts} attempts remaining
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
