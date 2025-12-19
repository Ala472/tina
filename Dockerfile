FROM php:8.2-fpm-alpine

# 1. Installer les libs système (zip, git, etc.)
RUN apk add --no-cache git unzip libzip-dev

# 2. Installer les extensions PHP
RUN docker-php-ext-install zip pdo_mysql

# 3. INSTALLER COMPOSER (La ligne qui vous manquait)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# 4. Copier les fichiers
COPY . .

# 5. Lancer composer
RUN composer install --no-dev --optimize-autoloader --no-scripts