FROM node:16.0.0
ENV NODE_ENV=production

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

# Install Nest.js globally
RUN npm install -g @nestjs/cli

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
