FROM mhart/alpine-node:9
# We store all our files in /usr/src to perform the build
WORKDIR /usr/src
# We first add only the files required for installing deps
# If package.json or yarn.lock don't change, no need to re-install later

# install git
#RUN apk update && apk upgrade && \
#    apk add --no-cache bash git openssh python

COPY package.json yarn.lock ./
# We install our deps

#RUN yarn add sha3

RUN yarn
# We copy all source files
COPY . .
# We run the build and expose as /public
RUN yarn build && yarn export -- -o /public
