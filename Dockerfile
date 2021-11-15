FROM node

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3333

EXPOSE 3306

CMD ["yarn", "dev"]