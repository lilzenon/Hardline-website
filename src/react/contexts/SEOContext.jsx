/**
 * SEO Context - Manages dynamic SEO meta tags for the homepage
 * Fetches settings from dashboard API and updates meta tags in real-time
 * Uses React 19's native metadata support instead of react-helmet-async
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Dither } from '../components/ui/DitherShadcn';
import useLayloSDK from '../hooks/useLayloSDK';
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
      {/* React 19 Native Metadata Support */}
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
      {children}
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
  const [isVisible, setIsVisible] = useState(true);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: 'fixed',
          top: '10px',
          right: isVisible ? '320px' : '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '6px',
          padding: '8px 12px',
          fontSize: '12px',
          fontFamily: 'monospace',
          cursor: 'pointer',
          zIndex: 10000,
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(0, 0, 0, 0.8)';
        }}
      >
        {isVisible ? '🔍 Hide' : '🔍 SEO'}
      </button>

      {/* Debug Panel */}
      {isVisible && (
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
            fontFamily: 'monospace',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
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
      )}
    </>
  );
};

/**
 * Maintenance Mode Component - Responsive for Mobile and Desktop
 */
export const MaintenanceMode = () => {
  const { maintenanceStatus } = useSEO();
  const [isMobile, setIsMobile] = useState(false);
  const isLayloReady = useLayloSDK();

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

  // Don't show this overlay if we're on the dedicated maintenance page
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isMaintenancePage = currentPath === '/maintenance';

  console.log('🔍 MaintenanceMode overlay check:', {
    maintenanceMode: maintenanceStatus.maintenance_mode,
    currentPath,
    isMaintenancePage,
    shouldRender: maintenanceStatus.maintenance_mode && !isMaintenancePage
  });

  if (!maintenanceStatus.maintenance_mode || isMaintenancePage) {
    return null;
  }



  // Simple navigation function
  const handleGoHome = () => {
    if (window.navigateWithTransition) {
      window.navigateWithTransition('/');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#000000',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      overflow: 'hidden'
    }}>
      {/* Dither Background Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <Dither
          waveSpeed={0.02}
          waveFrequency={2.0}
          waveAmplitude={0.25}
          waveColor={[1.0, 1.0, 1.0]}
          colorNum={2}
          pixelSize={2}
          enableMouseInteraction={false}
          mouseRadius={1.0}
          className="dither-background"
        />
      </div>

      {/* Minimalist Maintenance Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 40px',
        borderRadius: '16px',
        background: 'rgba(22, 22, 22, 0.12)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '90%'
      }}>
        {/* BOUNCE2BOUNCE Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <img
            src="/images/figma-exact/b2b-logo-nav.svg"
            alt="BOUNCE2BOUNCE"
            style={{
              height: '48px',
              width: 'auto',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: 0.95,
              filter: 'brightness(0) invert(1)'
            }}
            onClick={handleGoHome}
            onError={(e) => {
              // Fallback to text if logo fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div style={{
            display: 'none',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '18px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            BOUNCE2BOUNCE
          </div>
        </div>

        {/* Laylo Iframe */}
        <div style={{
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          {isLayloReady && (
            <iframe
              id="laylo-drop-c9ee71a5-2d3a-4da6-a528-eead61246989"
              frameBorder="0"
              scrolling="no"
              allow="web-share"
              allowTransparency="true"
              style={{
                width: '1px',
                minWidth: '100%',
                maxWidth: '1000px',
                height: 'auto',
                border: 'none'
              }}
              src="https://embed.laylo.com?dropId=c9ee71a5-2d3a-4da6-a528-eead61246989&color=ff0000&minimal=true&theme=light&background=transparent&customTitle=Stay Updated"
              title="Stay updated with BOUNCE2BOUNCE"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SEOContext;
