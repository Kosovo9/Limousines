# 🚀 BESTIA Dockerfile - Multi-stage Production Optimized
FROM node:18-alpine AS base

# Install system dependencies and security updates
RUN apk update && apk upgrade && \
    apk add --no-cache \
    dumb-init \
    curl \
    wget \
    git \
    python3 \
    make \
    g++ \
    libc6-compat \
    vips-dev \
    && rm -rf /var/cache/apk/*

# Set work directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S bestia -u 1001 -G nodejs

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/landing/package*.json ./frontend/landing/
COPY frontend/app/package*.json ./frontend/app/

# 🔥 STAGE 1: Dependencies Installation
FROM base AS deps

# Install all dependencies with optimizations
RUN npm ci --only=production --no-audit --no-fund && \
    cd backend && npm ci --only=production --no-audit --no-fund && \
    cd ../frontend/landing && npm ci --only=production --no-audit --no-fund && \
    cd ../app && npm ci --only=production --no-audit --no-fund

# ⚡ STAGE 2: Frontend Build
FROM base AS frontend-build

# Copy frontend dependencies
COPY --from=deps /app/frontend ./frontend
COPY --from=deps /app/node_modules ./node_modules

# Copy frontend source code
COPY frontend/ ./frontend/
COPY tailwind.config.ts ./
COPY next.config.js ./

# Set build environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV GENERATE_SOURCEMAP=false

# Build frontend applications
RUN cd frontend/landing && npm run build && \
    cd ../app && npm run build

# Optimize built assets
RUN find frontend/*/dist -name "*.js" -exec gzip -k {} \; && \
    find frontend/*/dist -name "*.css" -exec gzip -k {} \; && \
    find frontend/*/dist -name "*.html" -exec gzip -k {} \;

# 🎯 STAGE 3: Backend Build
FROM base AS backend-build

# Copy backend dependencies
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY --from=deps /app/node_modules ./node_modules

# Copy backend source code
COPY backend/ ./backend/

# Copy configuration files
COPY *.js ./
COPY *.json ./
COPY *.md ./

# Set production environment
ENV NODE_ENV=production

# 🚀 STAGE 4: Production Image
FROM node:18-alpine AS production

# Install runtime dependencies only
RUN apk update && apk add --no-cache \
    dumb-init \
    curl \
    wget \
    vips \
    && rm -rf /var/cache/apk/*

# Create application directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S bestia -u 1001 -G nodejs

# Copy production dependencies
COPY --from=deps --chown=bestia:nodejs /app/backend/node_modules ./backend/node_modules
COPY --from=deps --chown=bestia:nodejs /app/node_modules ./node_modules

# Copy backend application
COPY --from=backend-build --chown=bestia:nodejs /app/backend ./backend

# Copy built frontend assets
COPY --from=frontend-build --chown=bestia:nodejs /app/frontend/landing/dist ./backend/public/landing
COPY --from=frontend-build --chown=bestia:nodejs /app/frontend/app/dist ./backend/public/app

# Copy configuration files
COPY --chown=bestia:nodejs package*.json ./
COPY --chown=bestia:nodejs *.js ./
COPY --chown=bestia:nodejs render.yaml ./

# Create necessary directories
RUN mkdir -p /app/logs /app/uploads /app/temp && \
    chown -R bestia:nodejs /app

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV UV_THREADPOOL_SIZE=32
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Security: Use non-root user
USER bestia

# Expose port
EXPOSE 5000

# Start application with dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "backend/server.js"]

# Labels for metadata
LABEL maintainer="Bestia Team <bestia@limousines.com>"
LABEL version="2.0.0"
LABEL description="Premium Limousines API - BESTIA Performance Edition"
LABEL org.opencontainers.image.title="Limousines BESTIA API"
LABEL org.opencontainers.image.description="High-performance limousine booking platform"
LABEL org.opencontainers.image.version="2.0.0"
LABEL org.opencontainers.image.vendor="BESTIA Technologies"
LABEL org.opencontainers.image.source="https://github.com/Kosovo9/Limousines"
