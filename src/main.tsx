// Vite entry for SPA: reuse existing React implementation
// This imports the legacy webpack-based React app code so Vite can build it.
// It mounts homepage content when #root exists and exposes AdminLogin via window for /admin/login.
import './react/index.js';

