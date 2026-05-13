FROM node:20-alpine
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yml ./
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 5000
CMD ["pnpm", "start"]