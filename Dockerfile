# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /home/node/app

COPY . .

RUN npm install --legacy-peer-deps

ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 8100

CMD npm run prod
