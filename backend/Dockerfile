FROM node:alpine

WORKDIR /app
COPY package*.json ./
EXPOSE 443

RUN npm install -g nodemon && npm install
COPY ./ ./
CMD ["npm", "start"]