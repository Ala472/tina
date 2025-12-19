# Node build
FROM node:20 AS node_build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# PHP
FROM php:8.2-apache
WORKDIR /app

RUN docker-php-ext-install pdo pdo_mysql

COPY --from=node_build /app /app

RUN composer install --no-dev --optimize-autoloader

ENV APP_ENV=prod
ENV APP_DEBUG=0

EXPOSE 80
