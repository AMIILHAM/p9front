FROM node:14 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:latest

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
