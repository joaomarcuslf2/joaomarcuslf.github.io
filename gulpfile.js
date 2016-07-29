var gulp             = require('gulp'),
		browsersync      = require('browser-sync'),
		clean            = require('gulp-clean'),
		concat           = require('gulp-concat'),
		count            = require('gulp-count'),
		multiprocess     = require('gulp-multi-process'),
		rename           = require('gulp-rename'),
		runsequence      = require('run-sequence'),
		sourcemaps       = require('gulp-sourcemaps'),
		todo             = require('gulp-todo'),
		cp               = require('child_process'),
		run              = require('gulp-run'),
		path             = require('path'),
		karma            = require('karma'),
		karmaParseConfig = require('karma/lib/config').parseConfig;

var htmlmin          = require('gulp-htmlmin'),
		htmlLint         = require('gulp-html-lint');

/* CSS */

var csslint          = require('gulp-csslint'),
		cleancss         = require('gulp-clean-css'),
		beautify         = require('gulp-cssbeautify'),
		csscomb          = require('gulp-csscomb'),
		uncss            = require('gulp-uncss'),
		autoprefixer     = require('gulp-autoprefixer');

/* SCSS */

var sass             = require('gulp-ruby-sass'),
		scsslint         = require('gulp-scss-lint');

/* JS */

var uglify           = require('gulp-uglifyjs'),
		jshint           = require('gulp-jshint'),
		jslint           = require('gulp-jslint'),
		babel            = require('gulp-babel');;

/* Images */

var imagemin         = require('gulp-imagemin');

/* Resources */

var messages = {
	jekyllDev: 'Running: $ jekyll build for dev',
	jekyllProd: 'Running: $ jekyll build for prod'
};

/* Tasks */

gulp.task('default', function () {
		console.log("Gulp is working fine");
		return gulp.src("./*.js")
				.pipe(jslint())
				.pipe(jshint.reporter('default'));
});

gulp.task('test', function (cb) {
	return runKarma('karma.config.js', {
		autoWatch: false,
		singleRun: true
	}, cb);
});

gulp.task('jekyll', function (done) {
	console.log("Building Jekyll site");
	browsersync.notify(messages.jekyllDev);
	return run('jekyll build').exec();
});

gulp.task('clean', function (done) {
	console.log("Cleaning project");
	return run('npm run clean').exec();
});

gulp.task('clean:dist', function (done) {
	return run('rm -rf dist/*').exec();
});

gulp.task('browser-sync', function() {
	console.log("Syncronizing browser");
	browsersync.init({
		server: "dist",
		port: 3000
	});
});

gulp.task('todo', function () {
		console.log("Running TODO task");
		gulp.src("./assets/js/**/*.js")
				.pipe(todo())
				.pipe(gulp.dest('./assets/md'));
});

gulp.task('build', function (callback) {
		console.log("Running BUILD task");
		return runsequence('lint:all', ['test', 'default', 'todo', 'build:all', 'jekyll'], callback);
});

gulp.task('build:prod', function (callback) {
		console.log("Running BUILD task for production");
		return runsequence('default', ['clean:dist', 'build:all', 'jekyll', 'html', 'clean'], callback);
});

// All

gulp.task('lint:all', function (cb) {
		console.log("Linting all");
		return multiprocess(['lint:html', 'lint:scss', 'lint:js', 'lint:css', 'todo'], cb);
});

gulp.task('build:all', function (callback) {
		console.log("Building all assets");
		return runsequence('scss', ['css', 'js', 'img'], callback);
});

gulp.task('watch:multi', function (cb) {
		console.log("Watching all assets multi threaded");
		return multiprocess(['watch:scss', 'watch:css', 'watch:js', 'watch:html'], cb);
});

// HTML

gulp.task('html', function (callback) {
		console.log("Running HTML task");
		return runsequence('minify:html', ['lint:html'], callback);
});

gulp.task('lint:html', function() {
		return gulp.src('./**/*.html')
				.pipe(count('## html-files selected'))
				.pipe(htmlLint())
				.pipe(htmlLint.format())
				.pipe(htmlLint.failOnError());
});

gulp.task('minify:html', function() {
	return gulp.src('dist/**/*.html')
		.pipe(count('## html-files selected'))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('watch:html', function () {
		console.log("Watching HTML modifications");
		gulp.watch('./**/*.html', ['html']);
});

// JavaScript

gulp.task('js', function (callback) {
		console.log("Running JS task");
		return runsequence('lint:js', ['concat:js'], callback);
});

gulp.task('watch:js', function () {
		console.log("Watching JS modifications");
		gulp.watch('./assets/js/**/*.js', ['concat:js']);
});

gulp.task('lint:js', function () {
		console.log("Linting JavaScript");
		return gulp.src("./assets/js/**/*.js")
				.pipe(count('## js-files selected'))
				.pipe(jslint())
				.pipe(jshint.reporter('default'));
});

gulp.task('concat:js', function (callback) {
		console.log("Concatenating JS files");
		return runsequence(['concat:normal:js', 'concat:min:js'], callback);
});

gulp.task('concat:normal:js', function () {
		console.log("Concatenating to non-minified js");
		return gulp.src("./assets/js/**/*.js")
				.pipe(count('## js-files selected'))
				.pipe(babel({
					presets: ['es2015']
				}))
				.pipe(concat('custom.js'))
				.pipe(browsersync.reload({stream:true}))
				.pipe(gulp.dest('./lib/custom/'));
});

gulp.task('concat:min:js', function () {
		console.log("Concatenating to minified js");
		return gulp.src("./assets/js/**/*.js")
				.pipe(count('## js-files selected'))
				.pipe(babel({
					presets: ['es2015']
				}))
				.pipe(concat('custom.min.js'))
				.pipe(uglify())
				.pipe(browsersync.reload({stream:true}))
				.pipe(gulp.dest('./lib/custom/'));
});

// CSS

gulp.task('css', function (callback) {
		console.log("Running CSS task");
		return runsequence('lint:css', ['beautify:css', 'minify:css'], callback);
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
				.pipe(beautify({
						indent: '  ',
						openbrace: 'separate-line',
						autosemicolon: true
				}))
				.pipe(autoprefixer())
				.pipe(csscomb())
				.pipe(browsersync.reload({stream:true}))
				.pipe(gulp.dest('assets/css/'));
});

gulp.task('minify:css', function () {
		console.log("Minifing CSS");
		return gulp.src("./lib/custom/custom.css")
				.pipe(cleancss({
						compatibility: 'ie8',
						debug: true
				}, function (details) {
						console.log(details.name + ': ' + details.stats.originalSize);
						console.log(details.name + ': ' + details.stats.minifiedSize);
				}))
				.pipe(sourcemaps.write())
				.pipe(browsersync.reload({stream:true}))
				.pipe(rename('custom.min.css'))
				.pipe(gulp.dest("./lib/custom/"));
});

// Sass

gulp.task('scss', function (callback) {
		console.log("Running SCSS task");
		return runsequence('lint:scss', ['compile:scss', 'compile:custom:scss'], callback);
});

gulp.task('watch:scss', function () {
		console.log("Watching SCSS modifications");
		gulp.watch('assets/scss/**/*.scss', ['sass']);
});

gulp.task('lint:scss', function () {
		console.log("Linting SCSS");
		return gulp.src('assets/scss/**/*.scss')
				.pipe(count('## scss-files selected'))
				.pipe(scsslint());
});

gulp.task('compile:scss', function () {
		console.log("Compiling normal SCSS files");
		return sass('./assets/scss/**/*.scss')
				.on('error', sass.logError)
				.pipe(count('## scss-files selected'))
				.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
				.pipe(browsersync.reload({stream:true}))
				.pipe(gulp.dest('assets/css/'));
});

gulp.task('compile:custom:scss', function () {
		console.log("Compiling custom SCSS file");
		return sass('./assets/scss/style.scss')
				.on('error', sass.logError)
				.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
				.pipe(browsersync.reload({stream:true}))
				.pipe(gulp.dest('lib/custom/'))
				.pipe(rename('custom.css'));
});

// IMG

gulp.task('img', function (callback) {
		console.log("Running IMG task");
		return runsequence('minify:img');
});

gulp.task('watch:img', function () {
		console.log("Watching IMG modifications");
		gulp.watch('assets/img/**/', ['img']);
});

gulp.task('minify:img', function () {
		console.log("Minifying IMG");
		return gulp.src('./assets/img/**/')
				.pipe(count('## img-files selected'))
				.pipe(imagemin({
						optimizationLevel: 9
				}))
				.pipe(browsersync.reload({stream:true}))
				.pipe(gulp.dest('lib/custom/img/'));
});


// UTIL

function runKarma(configFilePath, options, cb) {

	configFilePath = path.resolve(configFilePath);

	var server = karma.server;
	var config = karmaParseConfig(configFilePath, {});

		Object.keys(options).forEach(function(key) {
			config[key] = options[key];
		});

	server.start(config, function(exitCode) {
		console.log('Karma has exited with ' + exitCode);
		cb();
		process.exit(exitCode);
	});
}