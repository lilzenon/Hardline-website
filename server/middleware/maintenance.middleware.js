const http = require('http');
const https = require('https');
const { cachedAdminFetch, invalidate } = require('../utils/admin-fetch-cache.util');

/**
 * Make HTTP request using native Node.js modules
 */
function makeHttpRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Homepage-Maintenance-Check/1.0'
      },
      timeout: 5000
    };

    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            console.warn(`⚠️ Maintenance API returned ${res.statusCode}`);
            reject(new Error(`API returned status ${res.statusCode}`));
            return;
          }
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (e) {
          console.warn('⚠️ Failed to parse maintenance API response');
          reject(new Error(`Failed to parse API response: ${e.message}`));
        }
      });
    });

    req.on('error', (error) => {
      console.warn('⚠️ Maintenance API request failed:', error.message);
      reject(error);
    });

    req.on('timeout', () => {
      console.warn('⚠️ Maintenance API request timed out');
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

/**
 * Maintenance Mode Middleware
 * 
 * Checks if maintenance mode is enabled and redirects users to the maintenance page.
 * Allows access to:
 * - /maintenance page itself
 * - Admin routes (/admin, /dashboard)
 * - API routes (/api)
 * - Static assets
 * - Allowed IP addresses (if configured)
 */

// Single global key: admin's maintenance flag is not per-domain.
const MAINTENANCE_CACHE_KEY = 'maintenance-status::global';
const MAINTENANCE_FRESH_MS = 30000; // 30 s fresh; stale window = cache default (30 min)

/**
 * Fetch maintenance status (dashboard API, local DB fallback).
 *
 * Goes through cachedAdminFetch — stale-while-revalidate with in-flight
 * dedupe — so a visitor is never parked behind the 5 s API timeout when the
 * 30 s window expires: the stale flag is served immediately and ONE
 * background refresh runs. The previous module-level cache had no stale
 * window and no dedupe, so every expiry made a burst of concurrent homepage
 * requests each wait on admin before any HTML could be sent.
 *
 * The fetcher always resolves to an object (never null) so an outage result
 * is cached for the fresh window as well; otherwise every request during an
 * admin+DB outage would retry and block for the full timeout.
 */
async function fetchMaintenanceStatus() {
  try {
    const { data } = await cachedAdminFetch({
      key: MAINTENANCE_CACHE_KEY,
      ttlMs: MAINTENANCE_FRESH_MS,
      fetcher: fetchMaintenanceStatusUncached,
    });
    return data || { maintenance_mode: false };
  } catch (error) {
    console.error('❌ Failed to fetch maintenance status from both API and database:', error.message);
    // Final fallback - assume not in maintenance mode to avoid breaking the site
    return { maintenance_mode: false };
  }
}

async function fetchMaintenanceStatusUncached() {
  // Determine the dashboard API URL - use localhost for development
  const dashboardApiUrl = process.env.DASHBOARD_API_URL ||
                         (process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : 'https://admin.b2b.click');
  const maintenanceUrl = `${dashboardApiUrl}/api/settings/maintenance-status`;

  try {
    return await makeHttpRequest(maintenanceUrl);
  } catch (apiError) {
    console.warn('⚠️ Dashboard API request failed, checking local database fallback:', apiError.message);
    // Never throws: returns a safe default on DB failure.
    return fetchMaintenanceStatusFromDatabase();
  }
}

/**
 * Fetch maintenance status from local database as fallback
 */
async function fetchMaintenanceStatusFromDatabase() {
  try {
    const knex = require('../knex');

    // Try to get from seo_settings table first (primary source)
    const seoSettings = await knex('seo_settings').first();

    if (seoSettings) {
      return {
        success: true,
        maintenance_mode: seoSettings.maintenance_mode || false,
        maintenance_message: seoSettings.maintenance_message || 'We are currently performing scheduled maintenance. Please check back soon.',
        maintenance_title: seoSettings.maintenance_title || 'Site Under Maintenance',
        estimated_downtime: seoSettings.maintenance_estimated_time || '2 hours',
        contact_information: 'support@bounce2bounce.com',
        timestamp: new Date().toISOString(),
        source: 'local_database'
      };
    }

    // Fallback to homepage_settings table if seo_settings doesn't exist
    const homepageSettings = await knex('homepage_settings').first();

    if (homepageSettings) {
      return {
        success: true,
        maintenance_mode: homepageSettings.maintenance_mode || false,
        maintenance_message: homepageSettings.maintenance_message || 'We are currently performing scheduled maintenance. Please check back soon.',
        maintenance_title: homepageSettings.maintenance_title || 'Site Under Maintenance',
        estimated_downtime: homepageSettings.estimated_downtime || '2 hours',
        contact_information: 'support@bounce2bounce.com',
        timestamp: new Date().toISOString(),
        source: 'local_database'
      };
    }

    // If no settings found, return default (maintenance disabled)
    return {
      success: true,
      maintenance_mode: false,
      maintenance_message: 'We are currently performing scheduled maintenance. Please check back soon.',
      maintenance_title: 'Site Under Maintenance',
      estimated_downtime: '2 hours',
      contact_information: 'support@bounce2bounce.com',
      timestamp: new Date().toISOString(),
      source: 'default'
    };

  } catch (dbError) {
    console.error('❌ Database fallback failed:', dbError.message);
    // Return safe default
    return {
      success: false,
      maintenance_mode: false,
      maintenance_message: 'We are currently performing scheduled maintenance. Please check back soon.',
      maintenance_title: 'Site Under Maintenance',
      estimated_downtime: '2 hours',
      contact_information: 'support@bounce2bounce.com',
      timestamp: new Date().toISOString(),
      source: 'error_fallback'
    };
  }
}

/**
 * Check if the current IP is in the allowed list
 */
function isIPAllowed(clientIP, allowedIPs) {
  if (!allowedIPs || allowedIPs.trim() === '') {
    return false;
  }

  const allowedList = allowedIPs
    .split(',')
    .map(ip => ip.trim())
    .filter(ip => ip.length > 0);

  return allowedList.includes(clientIP);
}

/**
 * Get client IP address
 */
function getClientIP(req) {
  return req.ip || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
         '127.0.0.1';
}

/**
 * Check if the route should be exempt from maintenance mode
 */
function isExemptRoute(path) {
  // Always allow access to these routes
  const exemptRoutes = [
    '/maintenance',     // The maintenance page itself
    '/admin',          // Admin routes
    '/dashboard',      // Dashboard routes
    '/api/',           // API routes
    '/static/',        // Static assets
    '/images/',        // Images
    '/js/',            // JavaScript files
    '/css/',           // CSS files
    '/favicon.ico',    // Favicon
    '/manifest.json'   // Web manifest
  ];

  // Check if path starts with any exempt route
  return exemptRoutes.some(route => path.startsWith(route));
}

/**
 * Maintenance mode middleware
 */
async function maintenanceMiddleware(req, res, next) {
  try {
    const path = req.path || req.url;

    // Skip maintenance check for exempt routes
    // (no per-request logging here: this runs on EVERY request and stdout is
    // synchronous on the platform)
    if (isExemptRoute(path)) {
      return next();
    }

    // Skip maintenance check for static file extensions
    if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|map|webmanifest)$/i)) {
      return next();
    }

    // Fetch maintenance status
    const maintenanceStatus = await fetchMaintenanceStatus();

    // If maintenance mode is not enabled, continue normally
    if (!maintenanceStatus.maintenance_mode) {
      return next();
    }

    // Check if the client IP is allowed
    const clientIP = getClientIP(req);
    const allowedIPs = maintenanceStatus.allowed_ips || '';
    
    if (isIPAllowed(clientIP, allowedIPs)) {
      console.log(`✅ IP ${clientIP} is allowed during maintenance`);
      return next();
    }

    // Redirect to maintenance page
    console.log(`🚧 Redirecting ${clientIP} to maintenance page (path: ${path})`);
    
    // For API requests, return JSON response
    if (path.startsWith('/api/')) {
      return res.status(503).json({
        success: false,
        error: 'Service temporarily unavailable',
        maintenance_mode: true,
        message: maintenanceStatus.maintenance_message || 'We are currently performing scheduled maintenance.',
        estimated_downtime: maintenanceStatus.estimated_downtime || '2 hours'
      });
    }

    // For regular requests, redirect to maintenance page
    return res.redirect('/maintenance');

  } catch (error) {
    console.error('❌ Maintenance middleware error:', error);
    // On error, continue normally to avoid breaking the site
    next();
  }
}

/**
 * Clear maintenance cache (useful for testing and immediate updates)
 */
function clearMaintenanceCache() {
  invalidate(MAINTENANCE_CACHE_KEY);
  console.log('🗑️ Maintenance cache cleared');
}

/**
 * Force refresh maintenance status (bypasses cache)
 */
async function refreshMaintenanceStatus() {
  try {
    console.log('🔄 Force refreshing maintenance status...');

    // Clear cache first
    clearMaintenanceCache();

    // Fetch fresh status
    const status = await fetchMaintenanceStatus();

    console.log(`✅ Maintenance status refreshed: ${status.maintenance_mode ? 'ENABLED' : 'DISABLED'}`);
    return status;
  } catch (error) {
    console.error('❌ Failed to refresh maintenance status:', error.message);
    return { maintenance_mode: false };
  }
}

module.exports = {
  maintenanceMiddleware,
  clearMaintenanceCache,
  refreshMaintenanceStatus,
  fetchMaintenanceStatus
};
