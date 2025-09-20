# Use official Node image (alpine is lightweight, but see Watchman note)
FROM node:20.19.4-alpine

WORKDIR /app

# Install app dependencies (npm ci is faster/safer if using package-lock.json)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose Expo's default port
EXPOSE 8081

# Start Expo CLI in tunnel mode for best cross-platform connectivity
CMD ["npx", "expo", "start", "--tunnel"]