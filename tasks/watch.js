var gulp = require('gulp');
var g = require('gulp-load-plugins')();
var paths = require('./paths');
var runSequence = require('run-sequence');

gulp.task('watch', function(cb) {
  runSequence(
    [
      'watch-less'
    ],
    cb
  );
});

gulp.task('watch-less', function(cb) {
  // watch the same files in our build-less task
  gulp.watch(paths.lessFiles, ['build-less'])
    .on('change', function(event) {
      if (event.type === 'deleted') {           // cleanup deleted files
        delete g.cached.caches.less[event.path];  // gulp-cached remove api
        g.remember.forget('scripts', event.path); // gulp-remember remove api
      }
    });
  cb();
});
