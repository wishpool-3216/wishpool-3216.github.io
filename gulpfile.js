var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var browserify = require('browserify');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream'); // <-- converts a Browserify stream into a stream that Gulp actually understands.
var uglify = require('gulp-uglify');

gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: 4000
	})
});

gulp.task('combineJS', function() {
	// Grabs all files in browser
 return gulp.src(['./browser/js/*.js', './browser/js/**/*.js'])
    		// concats everything together into a main.js file
        .pipe(concat('main.js'))
        // and saves it in the public directory
        .pipe(gulp.dest('./public/'));
});


gulp.task('default', ['combineJS', 'connect']);