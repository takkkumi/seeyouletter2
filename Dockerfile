FROM node:16.7.0-slim

#WORKDIR /workspaces/see-you-letter

#ENV PATH /workspaces/see-you-letter/node_modules/.bin:$PATH

COPY . /app
WORKDIR  /app
ENV NODE_ENV=production

RUN npm install --production && npm run build

# start app
CMD [ "npm", "run", "start" ]