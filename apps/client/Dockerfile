FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copia apenas arquivos essenciais para cache
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/client/package.json ./apps/client/

RUN pnpm install --frozen-lockfile --filter ./apps/client...

COPY . .

EXPOSE 5173

CMD ["pnpm", "--filter", "client", "dev", "--host"]
