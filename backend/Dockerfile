FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

ENV PORT=5000
EXPOSE 5000

CMD ["node", "src/server"]
