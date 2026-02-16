# Use full Node (not alpine) for native module support
FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8081 19000 19001 19002

CMD npx expo start $EXPO_START_ARGS