var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var globule = require('globule');

/* module
 *   js 
 *     module.js
 *     directives
 *        directive-1.js, etc.
 *     controllers
 *        controller-1.js, etc.
 *     etc...
 */

Array.prototype.addSuffix = function(suffix) {
  return this.map(function(x) {return x + suffix;});
};

Array.prototype.addPrefix = function(prefix) {
  return this.map(function(x) {return prefix + x;});
}

var ModuleSystem = function(moduleName) {
  this.moduleName = moduleName;
  this.js = moduleName + '/js';
  this.jsDirectories = globule.find(['*','!node_modules', '!dist'],{srcBase: this.path(__dirname,this.js), filter: 'isDirectory'});
  this.jsDirectorySearchPatterns = this.jsDirectories.addSuffix('/**/*.js');
  this.jsDirectorySearchPatterns.unshift('module.js');
  this.jsDirectorySearchPatterns = this.jsDirectorySearchPatterns.addPrefix(this.path(__dirname,moduleName,'js',''));
};

ModuleSystem.prototype.path = function() {
  return Array.prototype.slice.call(arguments).reduce(function(acc,x) {return acc + '/' + x;});
}

ModuleSystem.prototype.getSearchPatterns = function() {
  return this.jsDirectorySearchPatterns;
};

gulp.task('concatenateModules', function() {
  var modules = globule.find(['*','!*.*'],{srcBase:__dirname});
  console.log(modules);
  for (var i = 0; i < modules.length; i++) {
	var moduleSystem = new ModuleSystem(modules[i]);
	console.log(moduleSystem);
        gulp.src(moduleSystem.getSearchPatterns())
        .pipe(concat(modules[i]+'.js', {newLine: '\n'}))
        .pipe(gulp.dest(__dirname+'/' + modules[i] + '/dist/'));
  };
});

gulp.task('default',['concatenateModules']);
