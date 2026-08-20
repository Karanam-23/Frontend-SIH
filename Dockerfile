# Stage 1: Build stage
FROM node:20-alpine AS build

# Set work directory
WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source
COPY . .

# Declare build arguments for Vite environment variables
ARG VITE_API_BASE_URL
ARG VITE_USE_MOCK_API
ARG VITE_MAP_TILE_URL
ARG VITE_MAP_ATTRIBUTION

# Set them as environment variables for Vite to build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_USE_MOCK_API=$VITE_USE_MOCK_API
ENV VITE_MAP_TILE_URL=$VITE_MAP_TILE_URL
ENV VITE_MAP_ATTRIBUTION=$VITE_MAP_ATTRIBUTION

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
