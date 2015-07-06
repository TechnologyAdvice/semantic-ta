var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var runSequence = require('run-sequence');

gulp.task('default', 'build, docs, serve, watch', function(cb) {
  runSequence(
    [
      'build',
      'docs'
    ],
    [
    'serve',
    'watch'
    ],
  cb
  )
});
