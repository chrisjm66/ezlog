# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /home/node/app

COPY . .

# bc typescript is a devdependency
RUN npm install -g typescript 

RUN npm install

RUN npm run build

EXPOSE 8100

CMD tsx server.ts