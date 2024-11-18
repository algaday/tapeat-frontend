FROM node:20-alpine AS package

WORKDIR /app

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20-alpine AS build

WORKDIR /app

COPY --chown=node:node --from=package /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN yarn build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

ENV NODE_ENV=production

CMD ["sh", "-c", "echo NEXT_PUBLIC_BASE_API=$NEXT_PUBLIC_BASE_API && node server.js"]
