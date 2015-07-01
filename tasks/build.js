var gulp = require('gulp-help')(require('gulp'));
var g = require('gulp-load-plugins')();
var del = require('del');
var paths = require('./paths');
var runSequence = require('run-sequence');

gulp.task('build', 'clean dist, run all build-* tasks', function(cb) {
  runSequence(
    'clean-build',
    [
      'build-assets',
      'build-less'
    ],
    cb
  )
});

gulp.task('build-assets', 'copies default theme assets to dist', function() {
  return gulp.src(paths.assetFiles)
    .pipe(g.cached('assets'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-less', 'build less files', function() {
  var minifyOpts = {keepSpecialComments: 0};

  return gulp.src(paths.lessFiles)
    .pipe(g.plumber())              // don't kill watchers on error
    .pipe(function(file) {
      // todo: do that...
      // if `filename` *.variables ||  *.override
      // then replace with src/def/**/`filename`.less
    })
    //.pipe(g.cached('less'))         // only pass files changed since last build
    .pipe(g.less())                 // compile to css
    .pipe(g.autoprefixer())         // autoprefix for browser support
    //.pipe(g.remember('less'))       // add back files that didn't change
    .pipe(g.concat('ta.css'))       // concat all css files
    .pipe(gulp.dest(paths.dist))    // put in dist
    .pipe(g.minifyCss(minifyOpts))  // minify the build
    .pipe(g.rename('ta.min.css'))   // rename
    .pipe(gulp.dest(paths.dist));   // put that in dist also
});

gulp.task('clean-build', 'clean out the build dir', function(cb) {
  del('dist', cb);
});
