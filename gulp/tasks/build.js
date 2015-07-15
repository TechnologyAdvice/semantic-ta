var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var del = require('del');
var runSequence = require('run-sequence');
var paths = require('../paths');
var getSemanticLessFile = require('../plugins/getSemanticLessFile');
var _ = require('lodash');

var minifyOpts = {keepSpecialComments: 0};

gulp.task('build', 'build the theme and doc page', function(cb) {
  runSequence(
    'clean-build',
    [
      'build-assets',
      'build-cached-less'
    ],
    cb
  )
});

gulp.task('clean-build', function(cb) {
  del(paths.dist, cb);
});

gulp.task('build-assets', function() {
  return gulp.src(paths.assetFiles)
    .pipe(g.cached('assets'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-cached-less', function() {
  return gulp.src(_.union(
    paths.lessFiles,

    // .variables and .overrides are replaced with their corresponding .less
    //  definition file during build. We add them so they are watched and
    // trigger rebuilds of their corresponding less files.
    paths.componentVariables,
    paths.componentOverrides
  ))
    .pipe(g.plumber())              // don't kill watchers on error
    .pipe(g.cached('less'))         // only pass files changed since last build
    .pipe(getSemanticLessFile())    // for *.variables/overrides use the *.less
    .pipe(g.less())                 // compile to css
    .pipe(g.remember('less'))       // add back files that didn't change
    .pipe(g.concat('ta.css'))       // concat all css files
    .pipe(g.less())                 // move font @imports to the top
    .pipe(g.autoprefixer())         // autoprefix for browser support
    .pipe(gulp.dest(paths.dist))    // put in dist
    .pipe(g.minifyCss(minifyOpts))  // minify the build
    .pipe(g.rename('ta.min.css'))   // rename
    .pipe(gulp.dest(paths.dist));   // put that in dist also
});

gulp.task('build-all-less', function(cb) {
  g.util.log(g.util.colors.yellow('rebuilding all less'));

  return gulp.src(paths.lessFiles)
    .pipe(g.plumber())
    .pipe(g.less())
    .pipe(g.autoprefixer())
    .pipe(g.concat('ta.css'))
    .pipe(gulp.dest(paths.dist))
    .pipe(g.minifyCss(minifyOpts))
    .pipe(g.rename('ta.min.css'))
    .pipe(gulp.dest(paths.dist));
});
