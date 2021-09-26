FROM node:alpine

EXPOSE 3000

WORKDIR /frontend
COPY package*.json ./
COPY yarn.lock ./
EXPOSE 3000

RUN yarn install
COPY . .
CMD ["npm", "run", "dev"]