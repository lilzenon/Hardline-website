const http = require('http');
const https = require('https');

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
            console.warn(`⚠️ Maintenance API returned ${res.statusCode}, assuming not in maintenance`);
            resolve({ maintenance_mode: false });
            return;
          }
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (e) {
          console.warn('⚠️ Failed to parse maintenance API response, assuming not in maintenance');
          resolve({ maintenance_mode: false });
        }
      });
    });

    req.on('error', (error) => {
      console.warn('⚠️ Maintenance API request failed:', error.message);
      resolve({ maintenance_mode: false });
    });

    req.on('timeout', () => {
      console.warn('⚠️ Maintenance API request timed out');
      req.destroy();
      resolve({ maintenance_mode: false });
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

// Cache maintenance status to avoid hitting the API on every request
let maintenanceCache = {
  status: null,
  lastChecked: 0,
  cacheDuration: 30000 // 30 seconds
};

/**
 * Fetch maintenance status from the dashboard API
 */
async function fetchMaintenanceStatus() {
  try {
    // Check cache first
    const now = Date.now();
    if (maintenanceCache.status && (now - maintenanceCache.lastChecked) < maintenanceCache.cacheDuration) {
      return maintenanceCache.status;
    }

    // Determine the dashboard API URL - use localhost for development
    const dashboardApiUrl = process.env.DASHBOARD_API_URL ||
                           (process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : 'https://admin.b2b.click');
    const maintenanceUrl = `${dashboardApiUrl}/api/settings/maintenance-status`;

    console.log(`🔍 Checking maintenance status from: ${maintenanceUrl}`);

    const data = await makeHttpRequest(maintenanceUrl);
    
    // Update cache
    maintenanceCache.status = data;
    maintenanceCache.lastChecked = now;

    console.log(`✅ Maintenance status: ${data.maintenance_mode ? 'ENABLED' : 'DISABLED'}`);
    return data;

  } catch (error) {
    console.warn('⚠️ Failed to fetch maintenance status:', error.message);
    // On error, assume not in maintenance mode to avoid breaking the site
    return { maintenance_mode: false };
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
    console.log(`🔍 Maintenance middleware checking path: ${path}`);

    // Skip maintenance check for exempt routes
    if (isExemptRoute(path)) {
      console.log(`⏭️ Skipping maintenance check for exempt route: ${path}`);
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
 * Clear maintenance cache (useful for testing)
 */
function clearMaintenanceCache() {
  maintenanceCache = {
    status: null,
    lastChecked: 0,
    cacheDuration: 30000
  };
}

module.exports = {
  maintenanceMiddleware,
  clearMaintenanceCache,
  fetchMaintenanceStatus
};
