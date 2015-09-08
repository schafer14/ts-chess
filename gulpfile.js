'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var tap = require('gulp-tap');

// Tasks
gulp.task('default', ['typescript'], function() {
	gulp.watch('ts/**/*.ts', ['typescript']);
});

gulp.task('test', ['typescript', 'mochaTest']);

gulp.task('coverage', ['istanbul']);

// Components
gulp.task('typescript', function() {
	return gulp.src('./ts/**/*.ts')
		.pipe(ts({
			module: 'commonjs',
			target: 'es5',
		}))
		.pipe(gulp.dest('js'));
});

gulp.task('mochaTest', function() {
	return gulp.src('tests/**/*.js', {read: false})
		.pipe(mocha({ reporter: 'spec' }));
});

gulp.task('istanbul', function (cb) {
	gulp.src(['js/**/*.js'])
		.pipe(istanbul({ includeUntested: true }))
		// .pipe(istanbul.hookRequire())
		.on('finish', function () {
			gulp.src(['./tests/*.js'])
				.pipe(mocha())
				.pipe(istanbul.writeReports())
				.on('end', cb);
		});
});