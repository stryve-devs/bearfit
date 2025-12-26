# Use a lightweight Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies, including development dependencies
RUN npm install

# Copy all remaining source code
COPY . .

# Expose port 3000 for the backend
EXPOSE 3000

# Use ts-node to run TypeScript directly
CMD ["npx", "ts-node", "src/server.ts"]