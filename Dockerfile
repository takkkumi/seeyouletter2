FROM node:16.7.0

#WORKDIR /workspaces/see-you-letter

#ENV PATH /workspaces/see-you-letter/node_modules/.bin:$PATH

COPY . /app
WORKDIR  /app
RUN npm install && npm run build

# start app
CMD [ "npm", "run", "start" ]