# Use official Node.js LTS version
FROM node:23-slim

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app code
COPY . .

# Expose port
EXPOSE 3000

# Run the application
CMD ["node", "index.js"]
