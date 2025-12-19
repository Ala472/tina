# --- ÉTAPE 1 : Build des assets React ---
FROM node:20 AS node_build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# --- ÉTAPE 2 : Serveur PHP + Apache ---
FROM php:8.2-apache
WORKDIR /var/www/html

# 1. Installation des dépendances système et PHP
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libicu-dev \
    && docker-php-ext-install pdo pdo_mysql zip intl \
    && a2enmod rewrite

# 2. INSTALLATION DE COMPOSER (Correction de l'erreur 127)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

# 3. Configuration d'Apache pour pointer sur le dossier /public de Symfony
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# 4. Copie des fichiers du projet
COPY . .

# 5. Copie des assets compilés par Node
COPY --from=node_build /app/public/build ./public/build

# 6. Installation des dépendances PHP
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 7. Droits sur les dossiers de cache et logs
RUN chown -R www-data:www-data var public/build

ENV APP_ENV=prod
ENV APP_DEBUG=0

EXPOSE 80