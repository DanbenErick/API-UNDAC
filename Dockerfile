FROM node:20

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3500

CMD ["npm", "run", "build:live"]