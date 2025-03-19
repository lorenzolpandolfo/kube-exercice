FROM node:18-alpine
WORKDIR /app
COPY app.js .
RUN npm install amqplib
CMD ["node", "app.js"]
