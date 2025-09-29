# ---- Build stage ----
FROM node:22 AS builder
WORKDIR /usr/src/app


# Copy package manifests and install deps
COPY backend/package*.json ./
RUN npm ci


# Copy source and build
COPY backend/ .
RUN npm run build


# ---- Production stage ----
FROM node:22-alpine3.21 AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production


# Copy only what we need from builder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist


# Install production deps
RUN npm ci --omit=dev


EXPOSE 3000
CMD ["node", "dist/index.js"]