# Stage 1: build Angular
FROM node:16.2.0-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: serve com nginx
FROM nginx:1.25-alpine
COPY --from=builder /app/dist/querido-diario /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
