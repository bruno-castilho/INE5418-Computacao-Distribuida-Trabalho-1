FROM node:20.13.0-alpine

WORKDIR /usr/src/app

COPY ./socialize-api ./

RUN npm install

CMD [ "npm", "start" ]