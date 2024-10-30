# Используем образ Node.js для сборки
FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Используем образ Nginx для запуска приложения
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
