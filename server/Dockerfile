#============================
# Builder Stage
#============================
FROM node:20-alpine AS builder
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

# ============================
# Production Stage
# ============================

FROM node:20-alpine 
RUN corepack enable 
WORKDIR /app 
ENV NODE_ENV=Production
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod 
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma 

EXPOSE 5555
CMD ["pnpm", "start"]

HEALTHCHECK CMD wget --spider -q http://localhost:5555/health || exit 1
