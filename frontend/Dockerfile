FROM node:alpine AS build

WORKDIR /build
COPY . .

RUN npm i -D && \
  npm run build

FROM node:alpine

WORKDIR /app
COPY --from=build /build/build .

CMD ["node", "index.js"]
