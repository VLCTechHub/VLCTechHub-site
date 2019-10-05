FROM node:12.11-alpine as builder

WORKDIR /app

COPY . /app 

RUN yarn install

RUN NODE_ENV=production yarn build

FROM nginx:1.17-alpine

COPY --from=builder /app/* /usr/share/nginx/html/
