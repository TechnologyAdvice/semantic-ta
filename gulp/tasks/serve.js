var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var paths = require('../paths');

gulp.task('serve', 'start the dev server with livereload', function() {
  return gulp.src(paths.root)
    .pipe(g.webserver({
      host: 'localhost',
      port: 8080,
      fallback: 'index.html',
      livereload: {
        enable: true,
        filter: function(fileName) {
          var shouldReload = [
            paths.dist,
            paths.docs.dist,
            paths.root + '/index.html'
          ].some(function(reloadPath) {
              return fileName.match(reloadPath);
            });

          // for debugging
          // g.util.log([shouldReload, ': ', fileName].join(''));

          // only reload for dist file changes
          return shouldReload;
        }
      },
      open: true
    }));
});
