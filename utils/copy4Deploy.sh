#!/bin/bash
#copy all project files to a seperate directory for deployment
cd ~/git/FYP

grunt build


#root
cp -ru ~/git/FYP/server.js ~/git/FYP-heroku/server.js
cp -ru ~/git/FYP/package.json ~/git/FYP-heroku/package.json

#app
cp -ru ~/git/FYP/app/partials/* ~/git/FYP-heroku/app/partials/
cp -ru ~/git/FYP/app/fonts/* ~/git/FYP-heroku/app/fonts/
cp -ru ~/git/FYP/app/images/* ~/git/FYP-heroku/app/images/
cp -ru ~/git/FYP/dist/main.min.css ~/git/FYP-heroku/app/styles/
cp -ru ~/git/FYP/dist/app.min.js ~/git/FYP-heroku/app/scripts/app.min.js

#models
cp -ru ~/git/FYP/models/* ~/git/FYP-heroku/models/

#routes
cp -ru ~/git/FYP/routes/* ~/git/FYP-heroku/routes/

rm -rf ~/git/FYP/dist/
