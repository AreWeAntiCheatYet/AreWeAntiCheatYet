### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:hydrogen-alpine3.17 as builder
USER root

COPY package.json yarn.lock ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN yarn install --immutable && mkdir /next-app && mv ./node_modules ./next-app

WORKDIR /next-app

COPY . .

## Build the Next app in production mode and store the artifacts in dist folder

RUN yarn cache clean --force

ARG key
ENV STEAMGRIDDB_KEY $key

RUN yarn prefetch
RUN yarn build
RUN yarn export


### STAGE 2: Setup ###

FROM scratch

COPY --from=builder /next-app/out /app/
