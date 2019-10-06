FROM node:12.11-alpine as builder

ARG NODE_ENV

WORKDIR /app

COPY . /app 

RUN yarn install

RUN NODE_ENV=$NODE_ENV yarn build

FROM nginx:1.17-alpine

COPY --from=builder /app/* /usr/share/nginx/html/
