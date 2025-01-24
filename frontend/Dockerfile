FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
