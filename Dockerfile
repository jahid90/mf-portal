FROM node:16-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

COPY . .

CMD ["node", "./bin/www"]
