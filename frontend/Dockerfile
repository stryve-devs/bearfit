# Use a lightweight Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json files first to leverage Docker caching
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose necessary ports for Metro Bundler and Expo DevTools
EXPOSE 8081
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Start Metro Bundler
CMD npx expo start $EXPO_START_ARGS