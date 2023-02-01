FROM node:18.13.0

WORKDIR /usr/src/app
COPY package*.json /usr/src/app/

RUN npm i

COPY . /usr/src/app/

EXPOSE 3000

CMD ["npm", "run", "dev"]
