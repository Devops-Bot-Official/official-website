# Frontend Dockerfile
FROM node:18-slim

# Set the working directory
WORKDIR /frontend

# Copy application code
COPY . /frontend

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
