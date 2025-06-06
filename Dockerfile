# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /home/node/app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpx prisma generate

RUN pnpm run build

EXPOSE 8100

CMD pnpm run prod
