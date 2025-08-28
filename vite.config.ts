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
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for smaller files
    minify: 'terser',
    target: 'es2020',
    chunkSizeWarningLimit: 500, // Lower warning limit to catch large chunks
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        format: 'es',
        // Optimize chunk splitting for better caching and smaller initial load
        manualChunks: {
          // Separate vendor libraries for better caching
          'react-vendor': ['react', 'react-dom'],
          // Separate analytics and utilities
          'analytics': ['./src/lib/analytics/beacon', './src/utils/cleanup'],
          // Separate lazy-loaded pages
          'pages': ['./src/react/components/AboutPage', './src/react/components/ContactPage']
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
