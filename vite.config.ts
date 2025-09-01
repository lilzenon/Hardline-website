import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
    port: 3006, // Updated to match Vite's auto-selected port
    host: true, // Allow external connections
    cors: {
      origin: [
        'http://localhost:3006',
        'http://localhost:3005',
        'http://localhost:3000',
        'https://admin.b2b.click',
        'https://b2b.click'
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3006',
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket proxying
        headers: {
          'Origin': 'http://localhost:3006',
          'Referer': 'http://localhost:3006',
          'User-Agent': 'Mozilla/5.0 (compatible; Vite-Dev-Server)',
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('🚨 Proxy error connecting to dashboard API:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('📡 Proxying to dashboard:', req.method, req.url, '→ http://localhost:3006' + req.url);
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
        // MEMORY OPTIMIZATION: Aggressive chunk splitting for 512MB RAM limit
        manualChunks: {
          // Core React (keep minimal)
          'react-core': ['react', 'react-dom'],
          // Analytics (lazy load to save initial memory)
          'analytics': ['./src/lib/analytics/beacon'],
          // Utilities (separate to allow lazy loading)
          'utils': ['./src/utils/cleanup', './src/utils/mobileOptimization'],
          // Large components (lazy load to save memory)
          'figma-desktop': ['./src/react/components/FigmaDesktop'],
          'figma-mobile': ['./src/react/components/FigmaMobile'],
          // Hooks (separate for better tree shaking)
          'hooks': ['./src/react/hooks/useAnalytics', './src/react/hooks/useMobileLifecycle']
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
    // Optimize terser for production
    terserOptions: {
      compress: {
        // Enable aggressive optimizations for smaller bundles
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug', 'console.info'],
        // Enable safe optimizations
        hoist_funs: true,
        reduce_vars: true,
        collapse_vars: true,
        // Remove unused code
        dead_code: true,
        unused: true
      },
      mangle: {
        // Mangle all names for smaller bundles
        toplevel: true,
        safari10: true
      },
      format: {
        // Remove comments and optimize formatting
        comments: false,
        ascii_only: true
      }
    }
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
