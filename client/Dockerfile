# Base image
FROM node:lts-bookworm-slim AS base
WORKDIR /app
COPY ./package*.json ./
EXPOSE 5173

# Dev
FROM base AS dev
RUN npm ci
ENV NODE_ENV=development
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]

# Build
FROM dev AS build
ENV NODE_ENV=production
RUN npm run build

# Prod
FROM base AS prod
ENV NODE_ENV=production
RUN npm install -g serve
COPY --from=build /app/dist ./dist
RUN useradd -s /bin/bash -m appuser \
&& chown -R appuser:appuser /app
USER appuser
EXPOSE 5000
CMD ["serve", "-s", "dist", "-l", "5000"]
