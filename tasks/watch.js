var gulp = require('gulp');
var g = require('gulp-load-plugins')();
var paths = require('./paths');

/**
 * gulp.watch wrapper, removes deleted files from gulp-cache and gulp-remember.
 * @param src - gulp.src to watch.
 * @param tasks - gulp.tasks to run when the `src` change.
 * @param cacheKey - gulp-cache to clean up when the file is deleted.
 */
function watchCachedFiles(src, tasks, cacheKey) {
  var watcher = gulp.watch(src, tasks);

  watcher.on('change', function(e) {
    if (e.type === 'deleted') {                   // cleanup deleted files
      delete g.cached.caches[cacheKey][e.path];   // gulp-cached remove api
      g.remember.forget(cacheKey, e.path);        // gulp-remember remove api
    }
  });
}

gulp.task('watch', function(cb) {
  watchCachedFiles(paths.lessFiles, ['build-less'], 'less');
  watchCachedFiles(paths.assetFiles, ['build-assets'], 'assets');
  cb();
});
