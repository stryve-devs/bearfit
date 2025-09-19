# Use official Node image
FROM node:18-alpine

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose Expo's default port
EXPOSE 8081

# Start Expo CLI in tunnel mode (good for most dev environments)
CMD ["npx", "expo", "start", "--tunnel"]