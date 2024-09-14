FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install && npm run build

COPY . .

CMD [ "npm", "run", "preview" ]