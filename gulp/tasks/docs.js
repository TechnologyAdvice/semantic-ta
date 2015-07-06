var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var del = require('del');
var runSequence = require('run-sequence');
var paths = require('../paths');

gulp.task('docs', 'build the /docs page', function(cb) {
  runSequence(
    'clean-docs-dist',
    [
      'docs-less',
      'docs-html'
    ],
    cb
  );
});

gulp.task('clean-docs-dist', function(cb) {
  del(paths.docsDist, cb);
});

gulp.task('docs-less', function(cb) {
  return gulp.src(paths.docsSrc + '/*.less')
    .pipe(g.plumber())
    .pipe(g.cached('doc-less'))
    .pipe(g.less())
    .pipe(g.autoprefixer())
    .pipe(g.remember('doc-less'))
    .pipe(g.concat('doc-overrides.css'))
    .pipe(gulp.dest(paths.docsDist));
});

gulp.task('docs-html', function(cb) {
  return gulp.src(paths.docsSrc + '/*.html')
    .pipe(gulp.dest(paths.docsDist));
});
