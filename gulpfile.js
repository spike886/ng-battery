'use strict';

require('jshint-stylish');

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    ngBattery = {};

ngBattery.banner = [
  '/**',
  ' ** <%= pkg.name %> - <%= pkg.description %>',
  ' ** @author <%= pkg.author %>',
  ' ** @version v<%= pkg.version %>',
  ' **/',
  ''
].join('\n');

ngBattery._paths = {
    js: './src/**/*.js'
};

gulp.task('build', ['lint'], function() {
    gulp.src(ngBattery._paths.js)
        .pipe(concat('ng-battery.js'))
        .pipe(header(ngBattery.banner, { pkg: pkg}))
        .pipe(gulp.dest('dist'));

    gulp.src(ngBattery._paths.js)
        .pipe(concat('ng-battery.min.js'))
        .pipe(uglify())
        .pipe(header(ngBattery.banner, { pkg: pkg}))
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
    return gulp.src(ngBattery._paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
    gulp.watch(ngBattery._paths.js, ['lint']);
});

