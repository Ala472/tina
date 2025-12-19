FROM php:8.2-apache

WORKDIR /app

# PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Node
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
 && apt-get install -y nodejs

# Copy files
COPY . .

# Install PHP deps
RUN composer install --no-dev --optimize-autoloader

# Build assets
RUN npm install && npm run build

# Permissions
RUN chown -R www-data:www-data var public

EXPOSE 80
