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

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
Copy nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]