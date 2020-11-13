FROM node:alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json ./

COPY . ./

EXPOSE 3333
CMD yarn
CMD yarn dev