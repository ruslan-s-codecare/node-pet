FROM node:17
WORKDIR /app

ENV NODE_ENV production

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "index.js"]

