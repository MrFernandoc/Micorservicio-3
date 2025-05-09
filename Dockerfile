# Etapa base para construir la imagen
FROM node:16-alpine

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos del proyecto dentro del contenedor
COPY package.json ./
COPY .env ./
COPY src ./src
COPY swagger ./swagger

# Instalar las dependencias de Node.js
RUN npm install

# Exponer el puerto en el que la app estará corriendo
EXPOSE 3000

# Definir el comando para ejecutar la aplicación
CMD ["npm", "start"]