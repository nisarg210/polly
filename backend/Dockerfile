FROM node:16.5
RUN apt-get update
RUN apt-get install -y openssl
COPY package*.json ./usr/src/app/
WORKDIR /usr/src/app
COPY . ./
RUN npm install
EXPOSE 3000
EXPOSE 3002
RUN npx prisma generate
RUN npx prisma db push
CMD ["npx", "serverless", "offline"]
