FROM node:20-alpine

WORKDIR /client

COPY . .

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 4000

CMD ["pnpm", "run", "dev", "--port", "4000"]
