# ============================================================================
# KUTT URL SHORTENER - OPTIMIZED PRODUCTION DOCKERFILE
# ============================================================================
# Single-stage build with npm 11.5.2+ and all fixes applied
# Compatible with Express 5.x, Sharp module, and Vite build process
# Fixes Tailwind CSS and Rollup issues in Alpine Linux
# ============================================================================

FROM node:22-alpine

# Install system dependencies required for native modules (Sharp, etc.)
# Also install git for build info generation
# Using --no-cache to avoid storing package cache in the layer
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev

# Update npm to latest version (11.5.2 or newer)
RUN npm install -g npm@latest

# Set working directory
WORKDIR /kutt

# Copy package files for dependency installation
# This layer will be cached unless package files change
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for build)
# This is the key fix - we need dev dependencies for Tailwind CSS
RUN npm install

# Copy source code
# This layer will be invalidated when source code changes
COPY . .

# Fix Rollup optional dependencies issue in Alpine Linux
# This is a known npm bug with optional dependencies
RUN rm -rf node_modules package-lock.json && npm install

# Build the frontend (Vite + Tailwind CSS)
# This requires dev dependencies to be available
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --omit=dev

# Create necessary directories
RUN mkdir -p /var/lib/kutt

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
# Run migrations first, then start the server
CMD ["sh", "-c", "npm run migrate && npm start"]