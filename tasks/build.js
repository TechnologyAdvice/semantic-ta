var gulp = require('gulp');
var g = require('gulp-load-plugins')();
var del = require('del');
var paths = require('./paths');
var runSequence = require('run-sequence');

gulp.task('build', function(cb) {
  runSequence(
    'clean-build',
    [
      'build-assets',
      'build-less'
    ],
    cb
  )
});

gulp.task('build-assets', function() {
  return gulp.src(paths.assetFiles)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-less', function() {
  return gulp.src(paths.lessFiles)
    .pipe(g.plumber())
    .pipe(g.cached('less'))
    // load vars      (parse filename, ad.less === ad.variables)
    // load overrides (parse filename, ad.less === ad.overrides)
    .pipe(g.less())
    .pipe(g.autoprefixer())
    .pipe(g.remember('less'))
    .pipe(g.concat('semantic.css'))
    .pipe(gulp.dest(paths.dist))
    .pipe(g.minifyCss({keepSpecialComments: 0}))
    .pipe(g.rename('semantic.min.css'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('clean-build', function(cb) {
  del('dist', cb);
});
