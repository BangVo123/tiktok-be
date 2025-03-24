FROM node:20.11

WORKDIR /src

COPY package*.json .

RUN npm install

COPY . .

ENV PORT 3050

EXPOSE ${PORT}

CMD [ "npm", "run", "dev" ]