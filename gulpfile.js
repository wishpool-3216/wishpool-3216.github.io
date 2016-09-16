var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var browserify = require('browserify');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream'); // <-- converts a Browserify stream into a stream that Gulp actually understands.
var sass = require('gulp-sass');

gulp.task('connect', function () {
	connect.server({
		port: 4000,
		root: ['public']
	})
});

gulp.task('transferHTML', function() {
	return gulp.src('./browser/js/**/*.html')
				 .pipe(gulp.dest('./public/html'));
})

gulp.task('transferIndexHtml', function() {
	return gulp.src('./browser/index.html')
				 .pipe(gulp.dest('./public/'));
})

gulp.task('combineJS', function() {
	// Grabs all files in browser
 return gulp.src('./browser/js/**/*.js')
    		// concats everything together into a main.js file
        .pipe(concat('main.js'))
        // and saves it in the directory
        .pipe(gulp.dest('./public/'));
});

gulp.task('transferStyles', function() {
	gulp.src('./browser/css/index.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
	gulp.watch('./browser/js/**/*.js', ['combineJS']);
	gulp.watch('./browser/css/**/*.scss', ['transferStyles']);
	gulp.watch('./browser/js/**/*.html', ['transferHTML']);
	gulp.watch('./browser/index.html', ['transferIndexHtml']);
});

gulp.task('default', ['combineJS', 'connect','transferHTML', 'transferStyles', 'transferIndexHtml', 'watch']);
gulp.task('build', ['combineJS', 'connect','transferHTML', 'transferStyles', 'transferIndexHtml']);
