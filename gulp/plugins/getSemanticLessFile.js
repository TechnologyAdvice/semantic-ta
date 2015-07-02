'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var File = require('vinyl');
var fs = require('fs');
var c = gutil.colors;

// prevent parsing the same less file multiple times per build cycle.
// necessary as we can get the same less file 3 ways:
//   1) directly as foo.less
//   2) replacing foo.variables for foo.less
//   3) replacing foo.override for foo.less
var cache = {};

var log = {
  hasNoLessFile: function(configFile, lessFile) {
    gutil.log(c.yellow(configFile), 'exists without', c.red(lessFile));
  },
  fileReplaced: function(configFile, lessFile) {
    gutil.log(c.gray('replace'), configFile, c.gray('->'), c.green(lessFile));
  }
};

var onFinish = function(cb) {
  cache = {};
  cb();
};

/**
 * When a Semantic variables or overrides file changes, the corresponding
 * less file needs to be built.  This task replaces variables and
 * overrides files with the corresponding less definition file.
 */
var transform = function(file, enc, cb) {
  var configName = path.basename(file.path);
  var configExt = path.extname(file.path);
  var isVariableFile = configExt === '.variables';
  var isOverrideFile = configExt === '.overrides';
  var isReplaceCandidate = isVariableFile || isOverrideFile;
  var lessPath = file.path
    .replace('/src/site/', '/src/definitions/')
    .replace(configExt, '.less');
  var lessName = path.basename(lessPath);
  var alreadyReplaced = cache[lessPath];

  if (alreadyReplaced) {
    cb();
    return;
  }

  if (isReplaceCandidate) {
    // replace it with the less file
    try {
      file = new File({
        cwd: file.cwd,
        base: file.base,
        path: lessPath,
        contents: fs.readFileSync(lessPath)
      });

      // remember less files we've sent down stream
      // so we don't send it again this build cycle
      cache[file.path] = true;
      log.fileReplaced(configName, lessName);
    } catch (err) {
      log.hasNoLessFile(configName, lessName);
    }
  }

  cb(null, file);
};

module.exports = function() {
  return through.obj(transform, onFinish);
};
