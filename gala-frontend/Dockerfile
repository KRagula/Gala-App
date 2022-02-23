#base image
FROM node:16.14.0-buster

WORKDIR /frontend

#COPY package files
COPY package-lock.json package-lock.json
COPY package.json package.json

#install dependencies
RUN npm install

#copy source code
COPY . .

#execute command
CMD ["npm", "run", "start"]
