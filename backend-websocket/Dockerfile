FROM node:16.14.2

WORKDIR /nodejs/backend

COPY package*.json ./
RUN npm install

COPY ./app ./app
COPY ./index.js .
CMD [ "node", "index.js" ]