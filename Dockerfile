FROM node:12
WORKDIR /library
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm","start" ]