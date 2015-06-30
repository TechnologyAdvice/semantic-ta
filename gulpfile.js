var gulp = require('gulp');
var g = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

var requireDir = require('require-dir');
var tasks = requireDir('./tasks');

gulp.task('default', function(cb) {
  runSequence(
    'build',
    'watch',
    cb
  )
});
