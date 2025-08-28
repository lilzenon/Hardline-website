import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression for production builds
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false, // Keep original files
    }),
    // Brotli compression for production builds (better compression)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
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
    sourcemap: true,
    // FIXED: Use terser for more conservative minification to prevent hoisting issues
    minify: 'terser',
    target: 'es2020',
    // Optimize build performance
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: true, // Show compression stats for optimization
    rollupOptions: {
      output: {
        // FIXED: Remove manualChunks to prevent React initialization order issues
        // The vendor chunk splitting was causing 'Cannot access before initialization' errors
        // when lazy-loaded components tried to access React before it was fully loaded
        format: 'es',
        // FIXED: Add conservative code generation settings
        generatedCode: {
          constBindings: false,
          objectShorthand: false,
          reservedNamesAsProps: false
        }
      },
      // Optimize build performance
      treeshake: {
        preset: 'recommended'
      }
    },
    // FIXED: Add terser options for safer minification
    terserOptions: {
      compress: {
        // Disable aggressive optimizations that can cause hoisting issues
        hoist_funs: false,
        hoist_vars: false,
        reduce_vars: false,
        collapse_vars: false,
        // Keep function names for better debugging
        keep_fnames: true
      },
      mangle: {
        // Keep function names to prevent initialization issues
        keep_fnames: true
      }
    }
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
