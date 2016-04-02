var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs')
var less = require('gulp-less');
var path = require('path');
var cleanCSS = require('gulp-clean-css');

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
    .pipe(cleanCSS({compatibility: 'ie8'}));
});

gulp.task('less:watch', function () {
  gulp.watch('less/**/*.less',['less']);
});

