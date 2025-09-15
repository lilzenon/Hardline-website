# ============================================================================
# KUTT URL SHORTENER - OPTIMIZED PRODUCTION DOCKERFILE
# ============================================================================
# Multi-stage build for faster builds and smaller final image
# Compatible with Express 5.x, Sharp module, and Vite build process
# Optimized for CI/CD pipelines with BuildKit cache mounts
# Enhanced with dependency optimization and better layer caching
# ============================================================================

# Build stage
FROM node:22-alpine AS builder

# Install system dependencies required for native modules (Sharp, etc.)
# Combined into single RUN command to reduce layers
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
    freetype-dev && \
    npm install -g npm@latest

# Set working directory
WORKDIR /kutt

# Copy package files for dependency installation
# This layer will be cached unless package files change
COPY package*.json ./

# Install dependencies with BuildKit cache mount for faster rebuilds
# Use npm install since package-lock.json is excluded by .dockerignore
# Use --legacy-peer-deps to handle React 19 compatibility issues with react-helmet-async
RUN --mount=type=cache,target=/root/.npm \
    npm install --include=dev --prefer-offline --legacy-peer-deps

# Copy source code (excluding files in .dockerignore)
COPY . .

# Build the frontend with cache mount for npm cache only
# Set NODE_ENV to production for optimized builds
ENV NODE_ENV=production
RUN --mount=type=cache,target=/root/.npm \
    npm run build && \
    npm prune --omit=dev --legacy-peer-deps && \
    npm cache clean --force

# Production stage
FROM node:22-alpine AS production

# Install only runtime dependencies
RUN apk add --no-cache \
    cairo \
    jpeg \
    pango \
    giflib \
    pixman \
    libjpeg-turbo \
    freetype

# Create app user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S kutt -u 1001

# Set working directory
WORKDIR /kutt

# Copy built application from builder stage with optimized order
# Copy package.json first for better layer caching
COPY --from=builder --chown=kutt:nodejs /kutt/package*.json ./

# Copy production node_modules
COPY --from=builder --chown=kutt:nodejs /kutt/node_modules ./node_modules

# Copy built assets
COPY --from=builder --chown=kutt:nodejs /kutt/dist ./dist
COPY --from=builder --chown=kutt:nodejs /kutt/static ./static

# Copy server code
COPY --from=builder --chown=kutt:nodejs /kutt/server ./server

# Copy custom configurations
COPY --from=builder --chown=kutt:nodejs /kutt/custom ./custom

# Create necessary directories with proper permissions
RUN mkdir -p /var/lib/kutt uploads/og-images && \
    chown -R kutt:nodejs /var/lib/kutt uploads

# Switch to non-root user for security
USER kutt

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Optimized health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
# Run migrations first, then start the server
CMD ["sh", "-c", "npm run migrate && npm start"]