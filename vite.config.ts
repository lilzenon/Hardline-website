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
        target: 'http://localhost:3002', // 🔧 FIXED: Dashboard API server port
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket proxying
        headers: {
          'Origin': 'http://localhost:3002',
          'Referer': 'http://localhost:3002',
          'User-Agent': 'Mozilla/5.0 (compatible; Vite-Dev-Server)',
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
          proxy.on('error', (err, _req, _res) => {
            console.log('🚨 Proxy error connecting to dashboard API:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('📡 Proxying to dashboard:', req.method, req.url, '→ http://localhost:3002' + req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
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
        // 🔧 FIXED: Disable manual chunks to prevent module loading issues
        // manualChunks: undefined, // Let Vite handle chunking automatically
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
