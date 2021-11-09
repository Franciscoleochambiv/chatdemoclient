FROM node:14.15.4-alpine3.11 AS build
WORKDIR /home/Descargas/chat3/client/
COPY package.json ./
COPY . .
CMD ["npm","start"]
