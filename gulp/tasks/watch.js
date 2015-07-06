var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var paths = require('../paths');
var _ = require('lodash');

/**
 * gulp.watch wrapper, removes deleted files from gulp-cache and gulp-remember.
 * @param src - gulp.src to watch.
 * @param tasks - gulp.tasks to run when the `src` change.
 * @param cacheKey - gulp-cache to clean up when the file is deleted.
 */
function watchCachedFiles(cacheKey, src, tasks) {
  var watcher = gulp.watch(src, tasks);

  watcher.on('change', function(e) {
    if (e.type === 'deleted') {                   // cleanup deleted files
      delete g.cached.caches[cacheKey][e.path];   // gulp-cached remove api
      g.remember.forget(cacheKey, e.path);        // gulp-remember remove api
    }
  });
}

gulp.task('watch', 'watch for changes and rebuild ', function(cb) {
  //
  // Docs
  //

  gulp.watch([paths.docsSrc + '**/*.html'], ['docs-html']);
  watchCachedFiles('docs-less', paths.docsSrc + '/**/*.less', ['docs-less']);

  //
  // Theme
  //

  // Changes to global *.variables and *.overrides changes require rebuilding
  // the entire theme
  gulp.watch(_.union(
    paths.globalVariables,
    paths.globalOverrides
  ), ['build-all-less']);

  watchCachedFiles('assets', [
    paths.assetFiles
  ], ['build-assets']);

  watchCachedFiles('less', _.union(
    paths.lessFiles,
    paths.componentVariables,
    paths.componentOverrides
  ), ['build-cached-less']);

  cb();
});
