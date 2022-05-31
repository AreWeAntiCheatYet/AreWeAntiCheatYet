### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:lts-alpine3.14 as builder
USER root

COPY package.json yarn.lock ./

## Add imagemagick & graphicsmagick

RUN apk add imagemagick 
RUN apk add graphicsmagick

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN yarn install --immutable && mkdir /next-app && mv ./node_modules ./next-app

WORKDIR /next-app

COPY . .

## Build the Next app in production mode and store the artifacts in dist folder

RUN yarn cache clean --force

RUN yarn export


### STAGE 2: Setup ###

FROM scratch

COPY --from=builder /next-app/out /app/
