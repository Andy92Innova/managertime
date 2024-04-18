FROM node:20.12.2-alpine3.19
WORKDIR /backend
RUN apk update && apk add curl
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
EXPOSE 5001
CMD ["node", "app.js"]