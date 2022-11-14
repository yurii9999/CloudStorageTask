FROM node:16-alpine
#Comment for local version
#RUN apk update && apk add --no-cache bash
WORKDIR /upstorage/sup_chat
ADD package*.json ./
#Comment for local version
#RUN npm install
ADD . .
RUN npm run build
RUN ./node_modules/typescript/bin/tsc 
ENTRYPOINT ["node", "./dist/server.js"]
