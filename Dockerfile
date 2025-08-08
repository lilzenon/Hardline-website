# ============================================================================
# KUTT URL SHORTENER - OPTIMIZED PRODUCTION DOCKERFILE
# ============================================================================
# Multi-stage build for optimal performance, security, and efficiency
# Compatible with Express 5.x, Sharp module, and Vite build process
# Fixes Tailwind CSS and Rollup issues in Alpine Linux
# ============================================================================

# ============================================================================
# STAGE 1: BUILD STAGE
# ============================================================================
FROM node:22-alpine AS builder

# Install system dependencies required for native modules (Sharp, etc.)
# Using --no-cache to avoid storing package cache in the layer
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev

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

# ============================================================================
# STAGE 2: PRODUCTION STAGE
# ============================================================================
FROM node:22-alpine AS production

# Install only runtime system dependencies
# Significantly smaller than build dependencies
RUN apk add --no-cache \
    cairo \
    jpeg \
    pango \
    giflib \
    pixman \
    libjpeg-turbo \
    freetype

# Create non-root user for security
# Using specific UID/GID for consistency across environments
RUN addgroup -g 1001 -S kutt && \
    adduser -S kutt -u 1001 -G kutt

# Set working directory
WORKDIR /kutt

# Create necessary directories with proper ownership
RUN mkdir -p /var/lib/kutt && \
    chown -R kutt:kutt /kutt /var/lib/kutt

# Copy package files
COPY --chown=kutt:kutt package*.json ./

# Install only production dependencies
# This creates a much smaller final image
RUN npm ci --omit=dev && \
    npm cache clean --force

# Copy built application from builder stage
# This includes the compiled frontend in dist/
COPY --from=builder --chown=kutt:kutt /kutt/dist ./dist
COPY --from=builder --chown=kutt:kutt /kutt/static ./static
COPY --from=builder --chown=kutt:kutt /kutt/server ./server
COPY --from=builder --chown=kutt:kutt /kutt/migrations ./migrations
COPY --from=builder --chown=kutt:kutt /kutt/knexfile.js ./knexfile.js
COPY --from=builder --chown=kutt:kutt /kutt/knexfile.crm.js ./knexfile.crm.js

# Copy other necessary files
COPY --from=builder --chown=kutt:kutt /kutt/index.html ./index.html
COPY --from=builder --chown=kutt:kutt /kutt/build-info.json ./build-info.json

# Switch to non-root user
USER kutt

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