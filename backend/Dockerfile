FROM node:20.12.2-alpine3.19
WORKDIR /backend
COPY package.json package-lock ./
RUN npm install 
COPY . .
EXPOSE 5001
CMD ["node", "app.js"]