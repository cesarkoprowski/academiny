# Base
FROM node:20-alpine

# Instala dependências do sistema necessárias
RUN apk add --no-cache bash git python3 make g++

WORKDIR /app

# Copia arquivos essenciais para cache de dependências
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/server/package.json ./apps/server/

# Instala PNPM localmente e dependências do backend
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --filter ./apps/server...

# Copia o restante do monorepo
COPY . .

WORKDIR /app/apps/server

# Expondo porta do backend
EXPOSE 3000

# Comando para hot-reload com ts-node-dev
CMD ["pnpm", "dlx", "ts-node-dev", "-r", "tsconfig-paths/register", "--respawn", "--transpile-only", "src/main.ts"]

