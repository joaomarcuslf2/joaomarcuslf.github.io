var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	less = require('gulp-less'),
	path = require('path'),
	cleanCSS = require('gulp-clean-css'),
	cssBeautify = require('gulp-cssbeautify'),
      runSequence = require('run-sequence'),
      cssComb = require('gulp-csscomb'),
      sass = require('gulp-ruby-sass');

gulp.task('default', function (callback) { // Executa sequecia de tarefas principais do Gulp
  return runSequence('less', ['clean:css','concat:css', 'concat:js'], callback);
});

gulp.task('hint:js', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('concat:js', function() { // Concatenação de arquivos JS
    return gulp.src('./assets/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./lib/'));

});

gulp.task('concat:css', function() { // Concatenação de arquivos CSS
    return gulp.src('./assets/css/*.css')
    .pipe(concat('main.css'))
    .pipe(cssBeautify({
      indent: '  ',
      openbrace: 'separate-line',
      autosemicolon: true
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(cssComb())
    .pipe(gulp.dest('./lib/'));
});

gulp.task('less', function () {
  return gulp.src('./assets/less/**/custom.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('assets/css/'))
    .pipe(cssBeautify());
});


gulp.task('watch:less', function () {
  gulp.watch('assets/less/**/*.less',['less']);
});

gulp.task('clean:css', function () { // Limpa CSS
    return gulp.src('./assets/css/*.css')
    .pipe(cssBeautify({
      indent: '  ',
      openbrace: 'separate-line',
      autosemicolon: true
    }))
   .pipe(cssComb())
   .pipe(gulp.dest('assets/css/'));
});

gulp.task('watch:css', function () { // Assistir modificações em CSS
    gulp.watch('assets/css/*.css',['clean:css', 'concat:css']);
});

gulp.task('watch:js', function () { // Assistir modificações em JS
    gulp.watch('assets/js/*.js',['concat:js']);
});

gulp.task('watch:all', function () { // Assiste modificações em todos os arquivos de assets
  gulp.watch([
            'assets/**/*.less',
            'assets/**/*.css',
            'assets/**/*.js',
             ], ['default']);
});