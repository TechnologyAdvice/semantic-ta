var g = require('gulp-load-plugins')();
var gulp = g.help(require('gulp'), require('../gulphelp'));
var del = require('del');
var runSequence = require('run-sequence');
var paths = require('../paths');
var getSemanticLessFile = require('../plugins/getSemanticLessFile');

var minifyOpts = {keepSpecialComments: 0};

gulp.task('build', 'build the theme and doc page', function(cb) {
  runSequence(
    'clean-build',
    'clean-docs-dist',
    [
      'build-docs-less',
      'build-assets',
      'build-less'
    ],
    cb
  )
});

//
// Docs
//
gulp.task('clean-docs-dist', false, function(cb) {
  del(paths.docs.dist, cb);
});

gulp.task('build-docs-less', false, function(cb) {
  return gulp.src(paths.docs.src + '*.less')
    .pipe(g.plumber())
    .pipe(g.cached('doc-less'))
    .pipe(g.less())
    .pipe(g.autoprefixer())
    .pipe(g.remember('doc-less'))
    .pipe(g.concat('doc-overrides.css'))
    .pipe(gulp.dest(paths.docs.dist));
});


//
// Theme
//

gulp.task('clean-build', false, function(cb) {
  del('dist', cb);
});

gulp.task('build-assets', false, function() {
  return gulp.src(paths.assetFiles)
    .pipe(g.cached('assets'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-less', false, function() {
  return gulp.src(paths.lessFiles)
    .pipe(g.plumber())              // don't kill watchers on error
    .pipe(g.cached('less'))         // only pass files changed since last build
    .pipe(getSemanticLessFile())    // for *.variables/overrides use the *.less
    .pipe(g.less())                 // compile to css
    .pipe(g.autoprefixer())         // autoprefix for browser support
    .pipe(g.remember('less'))       // add back files that didn't change
    .pipe(g.concat('ta.css'))       // concat all css files
    .pipe(gulp.dest(paths.dist))    // put in dist
    .pipe(g.minifyCss(minifyOpts))  // minify the build
    .pipe(g.rename('ta.min.css'))   // rename
    .pipe(gulp.dest(paths.dist));   // put that in dist also
});
