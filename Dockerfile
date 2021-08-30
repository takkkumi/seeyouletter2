FROM node:16.7.0

#WORKDIR /workspaces/see-you-letter

#ENV PATH /workspaces/see-you-letter/node_modules/.bin:$PATH

COPY . /app
WORKDIR  /app
RUN yarn install && yarn run build

# start app
CMD [ "yarn", "run", "start" ]