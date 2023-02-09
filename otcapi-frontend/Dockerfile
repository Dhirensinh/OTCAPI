#FROM node:14.21-alpine as otc-api-frontend
ARG AWS_ACCOUNT_ID
ARG AWS_DEFAULT_REGION
FROM ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/bv-node-14:latest as otc-api-frontend
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@6.1.1
RUN npm install
RUN npm run build --prod

# FROM nginx:alpine
FROM ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/bv-nginx:latest
RUN rm -rf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=otc-api-frontend /app/dist/otc-api-frontend/ /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]