#!/bin/bash

node env.js prod

cd ..
cd client/
npm install
npm run build
mv build/ ..

cd ..
sudo npm install
gcloud config set project sfbangers
gcloud app deploy prod.yaml --no-cache
rm -r build/
cd deployment/

node env.js local