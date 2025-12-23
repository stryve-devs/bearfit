# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all remaining source code
COPY . .

# Compile TypeScript to JavaScript (output to 'dist/' folder)
RUN npm run build

# Expose port 3000 for the server
EXPOSE 3000

# Start the backend server (entry file is 'dist/server.js')
CMD ["node", "dist/server.js"]