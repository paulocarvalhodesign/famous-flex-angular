var gulp = require('gulp');
var concat = require('gulp-concat');
 
gulp.task('concatenate', function() {
  return gulp.src(['./module.js','./directives/**/*.js','./services/**/*.js'])
    .pipe(concat('famousflexangular.js', {newLine: '\n'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default',['concatenate']);
