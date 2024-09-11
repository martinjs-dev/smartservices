FROM node:18 as builder


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM nginx:alpine


COPY --from=0 /app/build /usr/share/nginx/html
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Exposer le port
EXPOSE 8080

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
