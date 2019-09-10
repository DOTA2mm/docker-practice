FROM node:latest

# Create app directory
WORKDIR /usr/app

COPY . .

RUN npm config set registry 'https://registry.npm.taobao.org/' \
    && npm install

EXPOSE 5200

# CMD [ "node", "index.js" ]
