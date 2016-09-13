#!/bin/bash
cd /var/www/wishpool-3216.github.io
kill $(lsof -ti :4000)
export GIT_MERGE_AUTOEDIT=no
git fetch
git pull
forever start node_modules/gulp/bin/gulp.js
