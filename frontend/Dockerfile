FROM node:20.12.2-alpine3.19
WORKDIR /frontend
RUN apk update && apk add curl
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD ["npm","run", "startdocker"]
