#!/bin/bash
# script name: copy4deploy.sh
#
#purpose: Build and Copy all project files to a separate directory for deployment

mkdir -p ../deploy
mkdir -p ../deploy/app/partials
mkdir -p ../deploy/app/bower_components
mkdir -p ../deploy/app/fonts
mkdir -p ../deploy/app/images
mkdir -p ../deploy/app/styles
mkdir -p ../deploy/app/scripts
mkdir -p ../deploy/app/views
mkdir -p ../deploy/models
mkdir -p ../deploy/routes
grunt build


#root
cp -ru  server.js ../deploy/server.js
cp -ru  package.json ../deploy/package.json

#bower
cp -ru app/bower_components/* ../deploy/app/bower_components

#app
cp -ru app/partials/* ../deploy/app/partials/
cp -ru app/fonts/* ../deploy/app/fonts/
cp -ru app/images/* ../deploy/app/images/
cp -ru app/views/* ../deploy/app/views/

rm ../deploy/app/views/boilerplate.ejs
mv ../deploy/app/views/boilerplatebuild.ejs ../deploy/app/views/boilerplate.ejs 

#copy over minified versions
cp -ru dist/main.min.css ../deploy/app/styles/
cp -ru dist/app.min.js ../deploy/app/scripts/app.min.js

#models
cp  -ru  models/* ../deploy/models/

#routes
cp -ru routes/* ../deploy/routes/

rm -rf dist/

echo "project built in deploy"
