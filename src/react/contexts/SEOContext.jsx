/**
 * SEO Context - Manages dynamic SEO meta tags for the homepage
 * Fetches settings from dashboard API and updates meta tags in real-time
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
  fetchSEOSettings, 
  fetchMaintenanceStatus,
  generateMetaTags,
  getCachedSEOSettings,
  setCachedSEOSettings,
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

  // Generate meta tags from current settings
  const metaTags = generateMetaTags(seoSettings);

  const contextValue = {
    seoSettings,
    maintenanceStatus,
    metaTags,
    isLoading,
    lastUpdated,
    refreshSEOSettings,
    updateSEOSetting,
    loadSEOSettings
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
 * Maintenance Mode Component
 */
export const MaintenanceMode = () => {
  const { maintenanceStatus } = useSEO();

  if (!maintenanceStatus.maintenance_mode) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#000000',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔧</div>
      <h1 style={{ fontSize: '32px', marginBottom: '16px', fontWeight: 'bold' }}>
        Maintenance Mode
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '20px', maxWidth: '600px', lineHeight: 1.6 }}>
        {maintenanceStatus.maintenance_message}
      </p>
      {maintenanceStatus.estimated_downtime && (
        <p style={{ fontSize: '16px', marginBottom: '20px', opacity: 0.8 }}>
          Estimated downtime: {maintenanceStatus.estimated_downtime}
        </p>
      )}
      {maintenanceStatus.contact_information && (
        <p style={{ fontSize: '14px', opacity: 0.6 }}>
          Questions? Contact us: {maintenanceStatus.contact_information}
        </p>
      )}
    </div>
  );
};

export default SEOContext;
