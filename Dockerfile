FROM node:20

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install typescript -g

RUN tsc

RUn npm install pm2 -g

EXPOSE 3500

CMD ["npm", "start"]