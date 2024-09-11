FROM node:latest as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "dist/main" ]


ENV PORT=3000


HEALTHCHECK --interval=30s \
    --timeout=30s \
    CMD curl -f http://localhost:3000/ || exit 1
