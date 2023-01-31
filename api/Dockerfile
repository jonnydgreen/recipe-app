# --------------> Build image
FROM node:18.13.0 as build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci
COPY . /usr/src/app/
RUN npm run compile

# # --------------> Production build image
# FROM node:18.13.0 as build-production
# WORKDIR /usr/src/app
# COPY --from=build /usr/src/app/package*.json /usr/src/app/
# RUN npm ci --only=production --ignore-scripts
# COPY --from=build /usr/src/app/dist /usr/src/app/dist

# # --------------> Production image
# FROM node:18.13.0 as production
# RUN apk add dumb-init
# ENV NODE_ENV production
# USER node
# WORKDIR /usr/src/app
# COPY --chown=node:node --from=build-production /usr/src/app/node_modules /usr/src/app/node_modules
# COPY --chown=node:node --from=build-production /usr/src/app/package*.json /usr/src/app/
# COPY --chown=node:node --from=build-production /usr/src/app/dist /usr/src/app/dist
# COPY --chown=node:node config /usr/src/app/config
# CMD ["dumb-init", "node", "."]

# --------------> Dev image
FROM node:18.13.0 as local
ENV NODE_ENV development
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/package*.json /usr/src/app/
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
CMD ["npm", "run", "-s", "dev"]
