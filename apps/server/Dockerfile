FROM node:16-alpine AS build-stage

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm ci --loglevel error --no-fund

COPY --chown=node:node . .

RUN npm run build

FROM node:16-alpine

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --from=build-stage --chown=node:node /home/node/app/dist ./dist
COPY --from=build-stage --chown=node:node /home/node/app/package*.json ./

RUN npm ci --only=production --loglevel error --no-fund

EXPOSE 4000
EXPOSE 5000
CMD [ "node", "./dist/index.js" ]