FROM oven/bun AS builder

WORKDIR /app

COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun install

COPY ./src ./src

ENV NODE_ENV=production

RUN bun build \
  --compile \
  --minify \
  --target bun \
  --outfile server \
  ./src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=builder /app/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 8000
