var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var paths = require('../paths');

gulp.task('serve', 'start the dev server with livereload', function() {
  return gulp.src([
    paths.root,
    paths.dist,
    paths.docsDist
  ])
    .pipe(g.webserver({
      host: 'localhost',
      port: 8080,
      livereload: {
        enable: true,
        filter: function(fileName) {
          var shouldReload = [
            paths.dist,
            paths.docsDist,
            paths.root + '/index.html'
          ].some(function(reloadPath) {
              return fileName.match(reloadPath);
            });

          // for debugging
          //g.util.log([
          //  g.util.colors.cyan('reload'),
          //  g.util.colors[shouldReload ? 'green' : 'red'](shouldReload),
          //  g.util.colors.gray(fileName)
          //].join(' '));

          return shouldReload;
        }
      },
      open: true
    }));
});
