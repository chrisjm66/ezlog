# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /home/node/app

COPY . .

# for prisma
RUN ls

RUN npm install --legacy-peer-deps

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 8100

CMD npm run prod
