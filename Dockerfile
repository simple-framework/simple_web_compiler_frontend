# base image
FROM node:alpine

# set working directory
WORKDIR /app

COPY . .

# install and cache app dependencies
# COPY package.json /app/package.json
RUN npm install
RUN npm build

EXPOSE 3000

# start app
CMD ["npm", "start"]