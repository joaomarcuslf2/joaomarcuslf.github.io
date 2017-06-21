const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('babel-core/register');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const exec = require('child_process').exec;
const cssBeautify = require('gulp-cssbeautify');
const cssComb = require('gulp-csscomb');
const imagemin = require('gulp-imagemin');

/* Tasks */

gulp.task('default', () => {
  gutil.log('Gulp is working fine');
});

// Bundle

gulp.task('bundle:img', ['minify:img'], (callback) => {});

gulp.task('bundle:js', () => {
  gutil.log('Starting bundle js files task');
  return exec('npm run bundle:js');
});

gulp.task('bundle:scss', () => {
  gutil.log('Starting bundle scss files task');
  return gulp.src('./assets/stylesheets/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(cssBeautify({
    indent: '  ',
    openbrace: 'separate-line',
    autosemicolon: true,
  }))
  .pipe(autoprefixer({
    browsers: [
      '> 5%',
      'IE 7',
      'last 5 versions',
    ],
    cascade: false,
  }))
  .pipe(cssComb())
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest('./build/css/'));
});

// Watchers

gulp.task('watch:assets', () => {
  gutil.log('Starting gulp scss bundle watcher');
  gulp.watch('assets/**/*.*', ['bundle:scss', 'bundle:img']);
});

gulp.task('watch:scss', () => {
  gutil.log('Starting gulp scss bundle watcher');
  gulp.watch('assets/stylesheets/**/*.scss', ['bundle:scss']);
});

gulp.task('watch:img', () => {
  gutil.log('Watching IMG modifications');
  gulp.watch('assets/images/**/*.*', ['bundle:img']);
});

// Build

gulp.task('run:build', ['build:js', 'build:scss', 'minify:img'], () => {});

gulp.task('build:js', () => exec('npm run build:js'));

gulp.task('build:scss', () => gulp.src('./assets/stylesheets/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({
      compatibility: 'ie8',
      debug: true
    }, function(details) {
      gutil.log(gutil.colors.red(`${details.name}: ${details.stats.originalSize}`));
      gutil.log(gutil.colors.green(`${details.name}: ${details.stats.minifiedSize}`));
    }))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('build/css/')));

gulp.task('minify:img', () => {
  gutil.log('Minifying IMG');
  return gulp.src('./assets/images/**/*.*')
        .pipe(imagemin({
          optimizationLevel: 15,
        }))
        .pipe(gulp.dest('build/img/'));
});
