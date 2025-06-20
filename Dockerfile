# nationwide-home-buyers/Dockerfile
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# ----- DEPENDENCIES STAGE -----
FROM base AS deps

# Copy package manifests
COPY package.json package-lock.json ./

# Install production dependencies first
RUN npm ci --only=production --ignore-scripts

# ----- DEV DEPENDENCIES STAGE -----
FROM base AS dev-deps

# Copy package manifests
COPY package.json package-lock.json ./

# Install all dependencies (including dev) for build
RUN npm ci --ignore-scripts

# ----- BUILD STAGE -----
FROM base AS builder

# Copy all dependencies (including dev dependencies for build)
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

# Set build-time environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Create minimal production .env file with placeholders
RUN echo "NODE_ENV=production" > .env.production && \
    echo "NEXT_PUBLIC_EMAILJS_SERVICE_ID=placeholder" >> .env.production && \
    echo "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=placeholder" >> .env.production && \
    echo "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=placeholder" >> .env.production && \
    echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=placeholder" >> .env.production

# Build application with increased memory allocation
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# ----- PRODUCTION RUNTIME STAGE -----
FROM base AS runner

# Set runtime environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Set the correct permission for the app directory
RUN mkdir -p .next/standalone .next/static && \
    chown -R nextjs:nodejs .next

# Copy only the necessary files from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Healthcheck to verify the application is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Run the application
CMD ["node", "server.js"]
