FROM node:20-alpine

WORKDIR /server

COPY . .

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "dlx", "ts-node-dev", "-r", "tsconfig-paths/register", "--respawn", "--transpile-only", "src/main.ts"]
