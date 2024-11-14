FROM node:20-alpine AS package

WORKDIR /app

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

USER node

FROM node:20-alpine AS build
WORKDIR /app


COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node --from=package /app/node_modules ./node_modules
COPY --chown=node:node . . 

RUN yarn build
USER node

FROM node:20-alpine AS production

WORKDIR /app

COPY --chown=node:node --from=package /app/node_modules ./node_modules

COPY --chown=node:node --from=build /app/.next ./.next
COPY --chown=node:node --from=build /app/public ./public
COPY --chown=node:node --from=build  /app/package.json  ./

ENV NODE_ENV=production

CMD ["yarn", "start"]
