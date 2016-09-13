#!/bin/bash
cd /var/www/wishpool-3216.github.io
forever stopall
export GIT_MERGE_AUTOEDIT=no
git fetch
git pull
sudo npm install
forever start node_modules/gulp/bin/gulp.js
