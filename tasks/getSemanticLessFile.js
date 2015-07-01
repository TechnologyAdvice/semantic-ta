'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var File = require('vinyl');
var fs = require('fs');

var chalk = gutil.colors;

module.exports = function() {

  /**
   * When a Semantic variables or overrides file changes, the corresponding
   * less file needs to be built.  This task substitutes variables and
   * overrides files with the corresponding less definition file.
   */
  var fileTransform = function(file, enc, cb) {
    var lessPath;
    var lessContents;
    var extension = path.extname(file.path);

    var isVariableFile = extension === '.variables';
    var isOverrideFile = extension === '.overrides';

    // replace the file with the less file
    if (isVariableFile || isOverrideFile) {
      lessPath = file.path
        .replace('/src/site/', '/src/definitions/')
        .replace(extension, '.less');

      try {
        lessContents = fs.readFileSync(lessPath)
      } catch (err) {
        gutil.log(
          chalk.yellow(path.basename(file.path)),
          chalk.grey('exists without'),
          chalk.red(path.basename(lessPath))
        );
        cb(null, file);
        return;
      }

      gutil.log(
        chalk.gray('substitute'),
        path.basename(file.path),
        chalk.gray('->'),
        chalk.green(path.basename(lessPath))
      );

      file = new File({
        cwd: file.cwd,
        base: file.base,
        path: lessPath,
        contents: lessContents
      });

    }

    cb(null, file);
  };

  return through.obj(fileTransform);
};
