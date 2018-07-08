FROM node:carbon

WORKDIR  /Users/Kevin/Desktop/HRLA/SDC/auction-component

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 2106

CMD [ "npm", "start" ]
