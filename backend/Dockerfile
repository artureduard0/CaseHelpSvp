FROM node:alpine

EXPOSE 443

WORKDIR /backend
COPY package*.json ./
EXPOSE 443

RUN npm install -g nodemon && npm install
COPY . .
CMD ["npm", "start"]