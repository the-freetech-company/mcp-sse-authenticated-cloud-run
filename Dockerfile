FROM node:18-slim AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install

RUN pnpm build

FROM node:18-slim AS production

WORKDIR /app

RUN npm install -g pnpm

ENV NODE_ENV=production
ENV PORT=8080

COPY . .
COPY --from=builder /app/dist ./services/dist

RUN pnpm install

WORKDIR /app

EXPOSE 8080

CMD ["node", "dist/index.js"] 