### STAGE 1: Build ###


# We label our stage as ‘builder’
FROM node:13.14.0-alpine3.11 as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /nuxt-app && mv ./node_modules ./nuxt-app

WORKDIR /nuxt-app

COPY . .

## Build the Nuxt app in production mode and store the artifacts in dist folder
RUN npm cache clean --force

RUN npm run generate -- --prod --output-path=dist


### STAGE 2: Setup ###

FROM scratch

COPY --from=builder /nuxt-app/dist /app/