# Use Node.js LTS
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files first (for caching installs)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the backend code
COPY . .

# Expose backend port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]