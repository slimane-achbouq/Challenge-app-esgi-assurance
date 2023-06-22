FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force && rm -rf node_modules && npm install

COPY . .

EXPOSE 3003

CMD ["npm", "run", "start:dev"]
