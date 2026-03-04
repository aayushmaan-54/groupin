# Base image
FROM node:lts-bookworm-slim AS base
WORKDIR /app
COPY ./package*.json ./
EXPOSE 3000

# Dev
FROM base AS dev
ENV NODE_ENV=development
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]

# Build
FROM dev AS build
ENV NODE_ENV=production
RUN npm run build

# Prod
FROM base AS prod
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
RUN useradd -s /bin/bash -m appuser \
  && chown -R appuser:appuser /app
USER appuser
CMD ["npm", "run", "start"]
