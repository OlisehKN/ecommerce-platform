# Use Node.js LTS as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the port the app will run on
EXPOSE 4000

# Run the app
CMD ["node", "index.js"]
