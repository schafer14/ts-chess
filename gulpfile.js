'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', ['typescript'], function() {
	gulp.watch('ts/**/*.ts', ['typescript']);
});


gulp.task('typescript', function() {
	gulp.src('./ts/**/*.ts')
		.pipe(ts({
			module: 'commonjs',
			target: 'es5',
		}))
		.pipe(gulp.dest('js'));
});