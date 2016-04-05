var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	less = require('gulp-less'),
	path = require('path'),
	cleanCSS = require('gulp-clean-css'),
	cssbeautify = require('gulp-cssbeautify');

gulp.task('concat', function() {
  return gulp.src('./js/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('less', function () {
  return gulp.src('./less/**/custom.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('css/'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(cssbeautify());
});

gulp.task('less:watch', function () {
  gulp.watch('less/**/*.less',['less']);
});