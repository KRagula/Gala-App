#base image
FROM node:16.14.0-buster

#set working directory
WORKDIR /backend

#COPY package files
COPY package-lock.json package-lock.json
COPY package.json package.json

#install node modules
RUN npm install


#copy source code
COPY . .

#start application, cmd gets executed when you run image inside container
CMD ["npm", "run", "start"]

