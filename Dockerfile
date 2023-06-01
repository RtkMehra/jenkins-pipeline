FROM node:16.0.0
ENV NODE_ENV=production

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

COPY ./ ./

RUN npm install --production
RUN npm run build

EXPOSE 3000

CMD [ "npm","run", "start:prod" ]