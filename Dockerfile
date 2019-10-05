# STEP 1 build static website
FROM node:8-alpine as builder
RUN apk update && apk add --no-cache make git
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package.json package-lock.json  /app/

RUN apk add --no-cache make gcc g++ python && \
  npm install  --silent && \
  apk del make gcc g++ python
# Copy project files into the docker image
COPY .  /app
RUN cd /app && ./node_modules/@angular/cli/bin/ng build --prod
# STEP 2 build a small nginx image with static website
FROM nginx:alpine
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'builder' copy website to default nginx public folder
COPY --from=builder /app/dist/amq-dashboard/ /usr/share/nginx/html
RUN rm -f  /etc/nginx/conf.d/*
COPY --from=builder  /app/nginx.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
