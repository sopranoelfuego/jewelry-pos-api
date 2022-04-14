# syntax=docker/dockerfile:1

FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /src
COPY . .
RUN yarn install --production
CMD ["node", "index.ts"]
EXPOSE 3000