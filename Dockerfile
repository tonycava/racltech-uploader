FROM node:20-alpine3.16 as deps
WORKDIR /app

COPY package.json .
RUN yarn install

FROM node:20-alpine3.16 as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn exec svelte-kit sync
RUN yarn build

FROM node:20-alpine3.16 as runner
EXPOSE 3000
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

CMD ["node", "build/index.js"]