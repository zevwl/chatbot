FROM node:6-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json package-lock.json .env server.js ./
COPY public/ public/

RUN npm install && npm cache clean

EXPOSE 8080

CMD ["npm", "start"]


