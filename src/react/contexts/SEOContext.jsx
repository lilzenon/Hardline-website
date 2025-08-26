/**
 * SEO Context - Manages dynamic SEO meta tags for the homepage
 * Fetches settings from dashboard API and updates meta tags in real-time
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  fetchSEOSettings,
  fetchMaintenanceStatus,
  generateMetaTags,
  getCachedSEOSettings,
  setCachedSEOSettings,
  clearSEOCache,
  DEFAULT_SEO_SETTINGS
} from '../services/seoService';

// Create SEO Context
const SEOContext = createContext();

/**
 * SEO Provider Component
 * Wraps the app and provides SEO functionality
 */
export const SEOProvider = ({ children }) => {
  const [seoSettings, setSeoSettings] = useState(DEFAULT_SEO_SETTINGS);
  const [maintenanceStatus, setMaintenanceStatus] = useState({ maintenance_mode: false });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState({ isMobile: false, deviceType: 'unknown' });

  /**
   * Load SEO settings from API or cache
   */
  const loadSEOSettings = async (useCache = true) => {
    try {
      setIsLoading(true);
      
      // Try cache first if enabled
      if (useCache) {
        const cached = getCachedSEOSettings();
        if (cached) {
          setSeoSettings(cached);
          setIsLoading(false);
          // Still fetch fresh data in background
          fetchFreshSEOSettings();
          return;
        }
      }

      // Fetch fresh data
      await fetchFreshSEOSettings();
      
    } catch (error) {
      console.error('❌ Failed to load SEO settings:', error);
      setSeoSettings(DEFAULT_SEO_SETTINGS);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch fresh SEO settings from API
   */
  const fetchFreshSEOSettings = async () => {
    try {
      console.log('🔄 Fetching fresh SEO settings...');
      
      // Fetch both SEO settings and maintenance status
      const [seoData, maintenanceData] = await Promise.all([
        fetchSEOSettings(),
        fetchMaintenanceStatus()
      ]);

      // Update state
      setSeoSettings(seoData);
      setMaintenanceStatus(maintenanceData);
      setLastUpdated(new Date());

      // Cache the settings
      setCachedSEOSettings(seoData);

      console.log('✅ SEO settings updated successfully');
      
    } catch (error) {
      console.error('❌ Failed to fetch fresh SEO settings:', error);
      // Keep existing settings on error
    }
  };

  /**
   * Refresh SEO settings manually
   */
  const refreshSEOSettings = async () => {
    console.log('🔄 Manual SEO settings refresh requested');
    await loadSEOSettings(false); // Skip cache
  };

  /**
   * Update specific SEO setting
   */
  const updateSEOSetting = (key, value) => {
    setSeoSettings(prev => {
      const updated = { ...prev, [key]: value };
      setCachedSEOSettings(updated);
      return updated;
    });
    setLastUpdated(new Date());
  };

  /**
   * Clear SEO cache manually
   */
  const clearCache = () => {
    clearSEOCache();
    console.log('🗑️ SEO cache cleared manually');
  };

  // Device detection effect
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent || '';
      const isMobileByUA = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isMobile = width <= 768 || isMobileByUA;

      let deviceType = 'desktop';
      if (isMobile) {
        deviceType = width <= 480 ? 'mobile' : 'tablet';
      }

      setDeviceInfo({ isMobile, deviceType });
      console.log('📱 SEO Device Detection:', { width, isMobile, deviceType });
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  // Load settings on mount
  useEffect(() => {
    loadSEOSettings();
  }, []);

  // Set up periodic refresh (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('⏰ Periodic SEO settings refresh');
      fetchFreshSEOSettings();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Note: React Helmet will automatically manage conflicts with server-side meta tags

  // Generate meta tags from current settings with device info
  const metaTags = useMemo(() => {
    if (!seoSettings) return { title: 'BOUNCE2BOUNCE', meta: [], link: [] };

    // Always generate full meta tags to ensure dynamic updates work
    // React Helmet will properly manage conflicts with server-side tags
    console.log('🔄 Generating dynamic meta tags from current SEO settings');
    return generateMetaTags(seoSettings, deviceInfo);
  }, [seoSettings, deviceInfo]);

  const contextValue = {
    seoSettings,
    maintenanceStatus,
    metaTags,
    isLoading,
    lastUpdated,
    deviceInfo,
    refreshSEOSettings,
    updateSEOSetting,
    clearCache,
    loadSEOSettings,
    isMaintenanceMode: () => maintenanceStatus.maintenance_mode
  };

  return (
    <SEOContext.Provider value={contextValue}>
      <HelmetProvider>
        {/* Dynamic Meta Tags */}
        <Helmet>
          <title>{metaTags.title}</title>
          {metaTags.meta.map((tag, index) => {
            if (tag.name) {
              return <meta key={`meta-${index}`} name={tag.name} content={tag.content} />;
            } else if (tag.property) {
              return <meta key={`meta-${index}`} property={tag.property} content={tag.content} />;
            }
            return null;
          })}
          {metaTags.link.map((link, index) => (
            <link key={`link-${index}`} {...link} />
          ))}
        </Helmet>
        {children}
      </HelmetProvider>
    </SEOContext.Provider>
  );
};

/**
 * Hook to use SEO context
 */
export const useSEO = () => {
  const context = useContext(SEOContext);
  if (!context) {
    throw new Error('useSEO must be used within a SEOProvider');
  }
  return context;
};

/**
 * SEO Debug Component - Shows current SEO settings in development
 */
export const SEODebug = () => {
  const { seoSettings, maintenanceStatus, lastUpdated, isLoading } = useSEO();

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        maxWidth: '300px',
        zIndex: 9999,
        fontFamily: 'monospace'
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        🔍 SEO Debug {isLoading && '(Loading...)'}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Title:</strong> {seoSettings.default_title}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Description:</strong> {seoSettings.default_description?.substring(0, 50)}...
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>OG Image:</strong> {seoSettings.default_og_image}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Twitter:</strong> {seoSettings.twitter_handle}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Maintenance:</strong> {maintenanceStatus.maintenance_mode ? '🔴 ON' : '🟢 OFF'}
      </div>
      
      {lastUpdated && (
        <div style={{ fontSize: '10px', opacity: 0.7 }}>
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

/**
 * Maintenance Mode Component - Responsive for Mobile and Desktop
 */
export const MaintenanceMode = () => {
  const { maintenanceStatus } = useSEO();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent || '';
      const isMobileByUA = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(width <= 768 || isMobileByUA);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!maintenanceStatus.maintenance_mode) {
    return null;
  }

  // Responsive styles based on device type
  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isMobile
      ? 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
      : 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center',
    padding: isMobile ? '20px' : '40px',
    overflow: 'hidden'
  };

  const iconStyle = {
    fontSize: isMobile ? '64px' : '96px',
    marginBottom: isMobile ? '24px' : '32px',
    filter: 'drop-shadow(0 4px 8px rgba(255, 255, 255, 0.1))'
  };

  const titleStyle = {
    fontSize: isMobile ? '28px' : '48px',
    marginBottom: isMobile ? '16px' : '24px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.02em'
  };

  const messageStyle = {
    fontSize: isMobile ? '16px' : '20px',
    marginBottom: isMobile ? '24px' : '32px',
    maxWidth: isMobile ? '320px' : '600px',
    lineHeight: 1.6,
    opacity: 0.9
  };

  const downtimeStyle = {
    fontSize: isMobile ? '14px' : '18px',
    marginBottom: isMobile ? '20px' : '24px',
    opacity: 0.8,
    padding: isMobile ? '8px 16px' : '12px 24px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: isMobile ? '20px' : '30px',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const contactStyle = {
    fontSize: isMobile ? '12px' : '16px',
    opacity: 0.6,
    marginTop: isMobile ? '20px' : '32px'
  };

  return (
    <div style={containerStyle}>
      <div style={iconStyle}>🔧</div>

      <h1 style={titleStyle}>
        {maintenanceStatus.maintenance_title || 'Site Under Maintenance'}
      </h1>

      <p style={messageStyle}>
        {maintenanceStatus.maintenance_message || 'We are currently performing scheduled maintenance. Please check back soon.'}
      </p>

      {maintenanceStatus.estimated_downtime && (
        <div style={downtimeStyle}>
          Estimated downtime: {maintenanceStatus.estimated_downtime}
        </div>
      )}

      {maintenanceStatus.contact_information && (
        <p style={contactStyle}>
          Questions? Contact us: {maintenanceStatus.contact_information}
        </p>
      )}

      {/* Glassmorphism decoration elements */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: isMobile ? '80px' : '120px',
          height: isMobile ? '80px' : '120px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: -1
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: isMobile ? '60px' : '100px',
          height: isMobile ? '60px' : '100px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '50%',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          zIndex: -1
        }}
      />
    </div>
  );
};

export default SEOContext;
