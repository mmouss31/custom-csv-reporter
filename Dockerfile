FROM node:10.11.0-alpine

RUN npm install -g newman

# Copy the file from your host to your current location.
COPY newman-reporter-customcsv-1.0.0.tgz .

RUN npm i -g newman-reporter-customcsv-1.0.0.tgz

ENTRYPOINT ["newman"]
