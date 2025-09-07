import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import path from 'path'
import { preloadOptimization } from './vite-plugins/preload-optimization'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ENHANCED: Advanced preload optimization for critical resources
    preloadOptimization({
      criticalChunks: ['react-core', 'router', 'index'],
      prefetchChunks: ['figma-mobile', 'figma-desktop', 'about-page', 'contact-page'],
      preloadFonts: true,
      preloadCriticalCSS: true
    }),
    // Aggressive Gzip compression for production builds
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 512, // Compress files larger than 512 bytes
      deleteOriginFile: false,
      compressionOptions: {
        level: 9, // Maximum compression level
        memLevel: 9 // Maximum memory usage for better compression
      }
    }),
    // Brotli compression for production builds (better compression)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 512,
      deleteOriginFile: false,
      compressionOptions: {
        level: 11, // Maximum brotli compression level
        mode: 0 // Generic mode for best compression
      }
    }),
  ],
  publicDir: 'static',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001, // 🔧 FIXED: Use available port for Vite dev server
    host: true, // Allow external connections
    cors: {
      origin: [
        'http://localhost:3001',
        'http://localhost:3000',
        'http://localhost:3005',
        'https://admin.b2b.click',
        'https://b2b.click'
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3002', // Dashboard API server
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket proxying
        timeout: 10000, // 10 second timeout
        headers: {
          'Origin': 'http://localhost:3001', // Use actual Vite dev server origin
          'Referer': 'http://localhost:3001',
          'User-Agent': 'Mozilla/5.0 (compatible; Vite-Dev-Server)',
          'X-Forwarded-For': '127.0.0.1',
          'X-Forwarded-Proto': 'http',
          'X-Forwarded-Host': 'localhost:3001'
        },
        rewrite: (path) => {
          // Handle proxy paths for static files
          if (path.startsWith('/api/proxy/')) {
            const rewrittenPath = path.replace('/api/proxy', '');
            console.log('🔄 Rewriting proxy path:', path, '→', rewrittenPath);
            return rewrittenPath;
          }
          return path;
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, req, res) => {
            console.error('🚨 Proxy error connecting to dashboard API:', err.message);
            // Send a proper error response instead of hanging
            if (!res.headersSent) {
              res.writeHead(503, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: false,
                error: 'Dashboard API unavailable',
                message: 'The dashboard API server is not responding. Please ensure it is running on port 3002.'
              }));
            }
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Add additional headers for better cross-domain support
            proxyReq.setHeader('X-Requested-With', 'XMLHttpRequest');
            proxyReq.setHeader('Accept', 'application/json');
            console.log('📡 Proxying to dashboard:', req.method, req.url, '→ http://localhost:3002' + req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Add CORS headers to proxied responses
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control');

            console.log('✅ Response from dashboard:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for smaller files
    minify: 'terser',
    target: 'es2020',
    chunkSizeWarningLimit: 250, // CRITICAL: Much smaller chunks for 512MB RAM limit
    reportCompressedSize: false, // Disable to save build memory
    rollupOptions: {
      output: {
        format: 'es',
        // 🚀 OPTIMIZED: Strategic code splitting for actually used dependencies
        manualChunks: {
          // Core React libraries (largest chunk)
          'react-vendor': ['react', 'react-dom'],

          // Animation libraries (GSAP is large)
          'animations': ['gsap'],

          // Icon library (Lucide React is large)
          'icons': ['lucide-react'],

          // Security libraries
          'security': ['dompurify']
        },
        // Optimize asset naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
      // Aggressive tree shaking for smaller bundles
      treeshake: {
        preset: 'smallest',
        moduleSideEffects: false
      }
    },
    // ENHANCED: Maximum terser optimization for production
    terserOptions: {
      compress: {
        // Aggressive console and debug removal
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug', 'console.info', 'console.warn'],

        // Advanced code optimization
        hoist_funs: true,
        reduce_vars: true,
        collapse_vars: true,
        inline: 2, // Aggressive function inlining
        passes: 3, // Multiple optimization passes

        // Remove unused code aggressively
        dead_code: true,
        unused: true,
        side_effects: false,

        // String and number optimizations
        join_vars: true,
        sequences: true,
        properties: true,

        // Conditional optimizations
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        loops: true,
        if_return: true,

        // Advanced optimizations (removed unsupported options)
        negate_iife: true
      },
      mangle: {
        // Maximum name mangling
        toplevel: true,
        safari10: true,
        properties: {
          regex: /^_/ // Mangle properties starting with underscore
        }
      },
      format: {
        // Minimal formatting for smallest size
        comments: false,
        ascii_only: true,
        beautify: false,
        semicolons: false
      }
    }
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
