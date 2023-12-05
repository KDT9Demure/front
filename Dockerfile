FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .env /app/.env

COPY . .

RUN npm run build


FROM nginx:alpine


COPY . .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
