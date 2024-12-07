# Use Node.js LTS for building the app
FROM node:20-alpine3.19 as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Use Nginx for serving the app
FROM nginx:stable-alpine

# Copy the build files to the Nginx HTML directory
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port Nginx will serve on
EXPOSE 8085

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

