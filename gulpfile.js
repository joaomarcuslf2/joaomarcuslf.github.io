var gulp = require('gulp');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var todo = require('gulp-todo');
var clean = require('gulp-clean');
var gulpMultiProcess = require('gulp-multi-process');
var rename = require("gulp-rename");
var exec = require('child_process').exec;
var clean = function(paths, opt) {
    var flag = '';
    
    if(opt.force) {
        flag = '-rf ';
    }
    return exec("rm " + flag + paths);
};

var csslint = require('gulp-csslint');
var cleanCSS = require('gulp-clean-css');
var cssBeautify = require('gulp-cssbeautify');
var cssComb = require('gulp-csscomb');
var uncss = require('gulp-uncss');
var autoprefixer = require('gulp-autoprefixer');

var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');

var uglify = require('gulp-uglifyjs');
var jshint = require('gulp-jshint');
var jslint = require('gulp-jslint');

var imageMin = require('gulp-imagemin');

gulp.task('default', function () {
    console.log("Gulp is working fine");
    return gulp.src("./*.js")
        .pipe(jslint())
        .pipe(jshint.reporter('default'));
});

gulp.task('todo', function () {
    console.log("Running TODO task");
    gulp.src("./assets/js/*/*.js")
        .pipe(todo())
        .pipe(gulp.dest('./assets/md'));
});

gulp.task('clean', function () {
    console.log("Running CLEAN task");
    return clean("./node_modules ./bower_components ./tests ./.sass-cache", {
        force: true
    });
});

gulp.task('build', function (callback) {
    console.log("Running BUILD task");
    return runSequence('lint:all', ['default', 'build:all', 'clean'], callback);
});

gulp.task('lint:app', function () {
    console.log("Linting JavaScript");
    return gulp.src(["./app/*.js", "./app/*/*.js"])
        .pipe(jslint())
        .pipe(jshint.reporter('default'));
});

// All

gulp.task('lint:all', function (cb) {
    console.log("Linting all");
    return gulpMultiProcess(['lint:scss', 'lint:js', 'lint:css', 'todo'], cb);
});

gulp.task('build:all', function (callback) {
    console.log("Building all assets");
    return runSequence('scss', ['css', 'js', 'img'], callback);
});

gulp.task('watch:all', function () {
    console.log("Watching all assets single threaded");
    gulp.watch([
           'assets/**/*'
             ], ['build:all']);
});

gulp.task('watch:multi', function (cb) {
    console.log("Watching all assets multi threaded");
    return gulpMultiProcess(['watch:scss', 'watch:css', 'watch:js'], cb);
});

// JavaScript

gulp.task('js', function (callback) {
    console.log("Running JS task");
    return runSequence('lint:js', ['concat:js'], callback);
});

gulp.task('watch:js', function () {
    console.log("Watching JS modifications");
    gulp.watch('assets/js/*.js', ['concat:js']);
});

gulp.task('lint:js', function () {
    console.log("Linting JavaScript");
    return gulp.src("./assets/js/*/*.js")
        .pipe(jslint())
        .pipe(jshint.reporter('default'));
});

gulp.task('concat:js', function (callback) {
    console.log("Concatenating JS files");
    return runSequence(['concat:normal:js', 'concat:min:js'], callback);
});

gulp.task('concat:normal:js', function () {
    console.log("Concatenating to non-minified js");
    return gulp.src("./assets/js/*/*.js")
        .pipe(concat('custom.js'))
        .pipe(gulp.dest('./lib/custom/'));
});

gulp.task('concat:min:js', function () {
    console.log("Concatenating to minified js");
    return gulp.src("./assets/js/*/*.js")
        .pipe(concat('custom.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./lib/custom/'));
});

// CSS

gulp.task('css', function (callback) {
    console.log("Running CSS task");
    return runSequence('lint:css', ['beautify:css', 'minify:css'], callback);
});

gulp.task('watch:css', function () {
    console.log("Watching CSS modifications");
    gulp.watch('lib/custom/custom.css', ['css']);
});

gulp.task('lint:css', function () {
    console.log("Linting CSS");
    gulp.src("./lib/custom/custom.css")
        .pipe(csslint());
});

gulp.task('beautify:css', function () {
    console.log("Beautifying CSS");
    return gulp.src('./lib/custom/custom.css')
        .pipe(cssBeautify({
            indent: '  ',
            openbrace: 'separate-line',
            autosemicolon: true
        }))
        .pipe(autoprefixer())
        .pipe(cssComb())
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('minify:css', function () {
    console.log("Minifing CSS");
    return gulp.src("./lib/custom/custom.css")
        .pipe(cleanCSS({
            compatibility: 'ie8',
            debug: true
        }, function (details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(sourcemaps.write())
        .pipe(rename('custom.min.css'))
        .pipe(gulp.dest("./lib/custom/"));
});

// Sass

gulp.task('scss', function (callback) {
    console.log("Running SCSS task");
    return runSequence('lint:scss', ['compile:scss', 'compile:custom:scss'], callback);
});

gulp.task('watch:scss', function () {
    console.log("Watching SCSS modifications");
    gulp.watch('assets/scss/*/*.scss', ['sass']);
});

gulp.task('lint:scss', function () {
    console.log("Linting SCSS");
    return gulp.src('assets/scss/*/*.scss')
        .pipe(scsslint());
});

gulp.task('compile:scss', function () {
    console.log("Compiling normal SCSS files");
    return sass('./assets/sass/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('compile:custom:scss', function () {
    console.log("Compiling custom SCSS file");
    return sass('./assets/sass/style.scss')
        .on('error', sass.logError)
        .pipe(rename('custom.css'))
        .pipe(gulp.dest('lib/custom/'));
});

// IMG

gulp.task('img', function (callback) {
    console.log("Running IMG task");
    return runSequence('minify:img', [], callback);
});

gulp.task('watch:img', function () {
    console.log("Watching IMG modifications");
    gulp.watch('assets/img/', ['img']);
});

gulp.task('minify:img', function () {
    console.log("Minifying IMG");
    return gulp.src('./assets/img/*')
        .pipe(imageMin({
            optimizationLevel: 9
        }))
        .pipe(gulp.dest('lib/custom/img/'));
});
