# Dockerfile from https://dev.to/aaronktberry/make-your-cli-app-more-portable-with-docker-dgo

# Base image of the docker container
FROM node:latest

# Copy the contents of the repo into the /app folder inside the container
COPY . /app

# Update the current working directory to the /app folder
WORKDIR /app

# Add your CLI's installation setups here
RUN npm i 
RUN npm i -g typescript
RUN tsc 
RUN npm link .

ENTRYPOINT ["/usr/local/bin/casinoroyale"]