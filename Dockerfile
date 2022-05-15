FROM node:16-bullseye-slim as base
  ENV NODE_ENV production
  RUN apt-get update && apt-get install -y openssl

FROM base as deps
  WORKDIR /app
  ADD package.json package-lock.json ./
  RUN npm install --production=false

FROM base as production-deps
  WORKDIR /app
  COPY --from=deps /app/node_modules /app/node_modules
  ADD package.json package-lock.json ./
  RUN npm prune --production

FROM base as build
  WORKDIR /app
  COPY --from=deps /app/node_modules /app/node_modules
  ADD prisma .
  RUN npx prisma generate
  ADD . .
  RUN npm run build

FROM base
  WORKDIR /app
  COPY --from=production-deps /app/node_modules /app/node_modules
  COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
  COPY --from=build /app/build /app/build
  COPY --from=build /app/public /app/public
  ADD . .
  CMD ["npm", "start"]
