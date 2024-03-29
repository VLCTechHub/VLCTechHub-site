FROM node:16-alpine

ARG NODE_ENV

WORKDIR /app

COPY . /app

ENV NODE_ENV $NODE_ENV

RUN yarn install
