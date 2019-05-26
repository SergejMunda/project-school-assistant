FROM node:lts-alpine

# make the 'app' folder the current working directory
WORKDIR /app/client

# copy both 'package.json' and 'package-lock.json' (if available)
COPY src/client/package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY src/client/ .

# build app for production with minification
RUN npm run build

WORKDIR /app
COPY src/package*.json ./

RUN npm install
COPY src/ .
EXPOSE 3000
CMD [ "npm", "run", "start-backend" ] 
