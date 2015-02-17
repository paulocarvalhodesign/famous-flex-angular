var file = require('file');
var gulp = require('gulp');
var gutil = require("gulp-util");
var concat = require('gulp-concat');
var webpack = require('gulp-webpack');
var runSequence = require('run-sequence');
var chug = require('gulp-chug');

gulp.task('registerFlexwithFamous', function() {
  var stack = [];
  var fileStack = [];
  var srcDirectory = 'node_modules/famous-flex/src/';
  file.walkSync(srcDirectory, function(dirPath, dirs, files) {
	var prefix = dirPath.split(srcDirectory)[1];
	files.forEach(function(name) {
		var pathname = 'famous-flex/' + (prefix ? prefix + '/' + name : name).split('.js')[0];
		var list = [
			'  ',
			'$famousProvider.registerModule(',
			'\'' + pathname + '\'',
			',',
			'require(',
			'\'' + pathname + '\'',
			'));'
		]
		console.log(list.join(''));
	});
  });
});
 
gulp.task('concatenate', function() {
  return gulp.src('./modules/gulpfile.js').pipe(chug())
});

gulp.task('webpack', function() {
  return gulp.src('./modules/app/dist/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('concatenate-then-webpack', function() {
  runSequence('concatenate','webpack', function() {
  });
});

gulp.task('default',['concatenate-then-webpack']);
