#!/bin/bash
# script name: copy4deploy.sh
#
#purpose: Build and Copy all project files to a separate directory for deployment


grunt build


#root
#cp   -ru  server.js ../deploy/server.js
#cp -ruP  package.json ../deploy/package.json

#app
cp  --parents -ru app/partials/* ../deploy/app/partials/
#cp -ruP app/fonts/* ../deploy/app/fonts/
#cp -ruP  app/images/* ../deploy/app/images/

#copy over minified versions
#cp -ruP dist/main.min.css ../deploy/app/styles/
#cp -ruP dist/app.min.js ../deploy/app/scripts/app.min.js

#models
#cp  -ruP  models/* ../deploy/models/

#routes
#cp -ruP routes/* ../deploy/routes/

rm -rf dist/

echo "project built in deploy"