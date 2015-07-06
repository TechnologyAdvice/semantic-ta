var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var paths = require('../paths');

gulp.task('serve', 'start the dev server with livereload', function () {
  console.log(paths.root);
  return gulp.src(paths.root)
    .pipe(g.webserver({
      host: 'localhost',
      port: 8080,
      fallback: 'index.html',
      livereload: {
        enable: true,
        filter: function (fileName) {
          // only reload for dist file changes
          return fileName.match(paths.dist);
        }
      },
      open: true
    }));
});
