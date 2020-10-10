FROM node:12-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

CMD ["node", "./bin/www"]
