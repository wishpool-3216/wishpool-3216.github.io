var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
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

gulp.task('transferAssets', function() {
	return gulp.src('./browser/assets/**/*.*')
				 .pipe(gulp.dest('./public/assets/'));
})

gulp.task('transferIndexHtml', function() {
	return gulp.src('./browser/index.html')
				 .pipe(gulp.dest('./public/'));
})

gulp.task('transferServiceWorker', function(){
	return gulp.src('./browser/service-worker.js')
				 .pipe(gulp.dest('./public'));
})

gulp.task('transferManifest', function(){
	return gulp.src('./browser/manifest.json')
				 .pipe(gulp.dest('./public'));
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
	gulp.watch('./browser/service-worker.js', ['transferServiceWorker']);
	gulp.watch('./browser/manifest.json', ['transferManifest']);
});

gulp.task('build', ['combineJS', 'connect','transferHTML', 'transferStyles', 'transferIndexHtml', 'transferServiceWorker', 'transferAssets', 'transferManifest']);

gulp.task('default', ['build', 'watch']);
