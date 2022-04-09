FROM node:16.14.2

WORKDIR /nodejs/backend

COPY package*.json ./
RUN npm install
RUN npm install bcrypt

COPY ./app ./app
COPY ./public ./public
COPY ./index.js .
CMD [ "node", "index.js" ]