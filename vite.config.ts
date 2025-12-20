import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import path from 'path'
import { preloadOptimization } from './vite-plugins/preload-optimization'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

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
    // 🖼️ NEW: Automated Image Optimization
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      excludePublic: [],
      includePublic: true,
      include: [],
      exclude: [],
      logStats: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false, // Keep viewBox for resizing
              },
            },
          },
          'sortAttrs',
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
            },
          },
        ],
      },
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 80,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
      },
      tiff: {
        // https://sharp.pixelplumbing.com/api-output#tiff
        quality: 80,
      },
      // gif does not support lossless or quality in a way that is good to compress
      // gif: {},
      webp: {
        // https://sharp.pixelplumbing.com/api-output#webp
        lossless: true,
      },
      avif: {
        // https://sharp.pixelplumbing.com/api-output#avif
        lossless: true,
      },
    }),
  ],
  publicDir: 'static',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3005, // 🚨 CRITICAL FIX: Match your local homepage port
    host: true, // Allow external connections
    cors: {
      origin: [
        'http://localhost:3005', // 🚨 CRITICAL FIX: Match actual homepage port
        'http://localhost:3001',
        'http://localhost:3000',
        'http://localhost:3002', // 🚨 CRITICAL FIX: Add dashboard port
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
          'Origin': 'http://localhost:3005', // 🚨 CRITICAL FIX: Match actual homepage port
          'Referer': 'http://localhost:3005',
          'User-Agent': 'Mozilla/5.0 (compatible; Vite-Dev-Server)',
          'X-Forwarded-For': '127.0.0.1',
          'X-Forwarded-Proto': 'http',
          'X-Forwarded-Host': 'localhost:3005' // 🚨 CRITICAL FIX: Match actual homepage port
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
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3005'); // 🚨 CRITICAL FIX: Match homepage port
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
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false, // Remove comments
      },
    },
    target: 'es2020',
    chunkSizeWarningLimit: 250, // CRITICAL: Much smaller chunks for 512MB RAM limit
    reportCompressedSize: false, // Disable to save build memory
    rollupOptions: {
      output: {
        format: 'es',
        // 🚀 OPTIMIZED: Strategic code splitting with proper React handling
        manualChunks: (id) => {
          // 1. Core React (Stable, essential)
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/scheduler/')) {
            return 'react-vendor';
          }

          // 2. Three.js Ecosystem (Large 3D libraries)
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }

          // 3. Animations (Framer Motion is very large)
          if (id.includes('framer-motion')) {
            return 'motion';
          }
          if (id.includes('gsap')) {
            return 'animations';
          }

          // 4. Data Management
          if (id.includes('@tanstack') || id.includes('react-query') || id.includes('zustand') || id.includes('axios')) {
            return 'query';
          }

          // 5. UI Components & Icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          if (id.includes('@radix-ui') || id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'ui-vendor';
          }

          // 6. Parsing & Utils
          if (id.includes('cheerio') || id.includes('htmlparser2') || id.includes('parse5')) {
            return 'parser';
          }
          if (id.includes('dompurify') || id.includes('isbot')) {
            return 'security';
          }
          if (id.includes('date-fns') || id.includes('moment') || id.includes('dayjs') || id.includes('luxon')) {
            return 'dates';
          }

          // 7. Catch-all for remaining node_modules
          if (id.includes('node_modules')) {
            return 'vendor'; // This should now be much smaller
          }
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
    // Minifier switched to esbuild for React/Three/Fiber compatibility
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    global: 'globalThis', // Fix for React Three Fiber in production builds
    'process.env': {},
  },
  optimizeDeps: {
    include: ['@react-three/fiber', '@react-three/postprocessing', 'three'],
    exclude: [],
  },
})
