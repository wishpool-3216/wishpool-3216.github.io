var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var browserify = require('browserify');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream'); // <-- converts a Browserify stream into a stream that Gulp actually understands.
var uglify = require('gulp-uglify');


gulp.task('combineJS', function() {
	// Grabs all files in browser
 return gulp.src(['./browser/js/*.js', './browser/js/**/*.js'])
    		// concats everything together into a main.js file
        .pipe(concat('main.js'))
        // and saves it in the public directory
        .pipe(gulp.dest('./public/'));
})

gulp.task('watch', function() {
	gulp.watch('./browser/js/*.js', ['combineJS'])
})


gulp.task('default', ['combineJS','watch'])