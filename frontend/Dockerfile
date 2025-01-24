# Use an official Nginx image to serve static files
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static files
RUN rm -rf ./*

# Copy all your frontend files (HTML, CSS, JS, images, etc.) to the container
COPY . /usr/share/nginx/html

# Expose port 80 for serving the application
EXPOSE 80

# Nginx runs by default, no need to specify a command
