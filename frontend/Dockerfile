FROM node:20.12.2-alpine3.19
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install && npm run run build
COPY . .
EXPOSE 5002
CMD ["npm","run", "start"]
