var path = require('path');
var PROJECT_ROOT = path.dirname(__dirname);

module.exports = {
  root: PROJECT_ROOT,
  src: PROJECT_ROOT + '/src',
  definitions: PROJECT_ROOT + '/src/definitions',
  dist: PROJECT_ROOT + '/dist',
  docs: PROJECT_ROOT + '/docs/dist',
  docsDist: PROJECT_ROOT + '/docs/dist',
  docsSrc: PROJECT_ROOT + '/docs/src',
  nodeModules: PROJECT_ROOT + '/node_modules',
  site: PROJECT_ROOT + '/src/site',
  componentVariables: [
    PROJECT_ROOT + '/src/site/**/*.variables',
    '!' + PROJECT_ROOT + '/src/site/globals/*.variables',

    // exclude busted video module
    '!' + PROJECT_ROOT + '/src/site/modules/video.variables'
  ],
  componentOverrides: [
    PROJECT_ROOT + '/src/site/**/*.overrides',
    '!' + PROJECT_ROOT + '/src/site/globals/*.overrides',

    // exclude busted video module
    '!' + PROJECT_ROOT + '/src/site/modules/video.overrides'
  ],
  globalVariables: [
    PROJECT_ROOT + '/src/site/globals/*.variables'
  ],
  globalOverrides: [
    PROJECT_ROOT + '/src/site/globals/*.overrides'
  ],
  lessFiles: [
    // must build reset and site first
    PROJECT_ROOT + '/src/definitions/globals/reset.less',   // site reset
    PROJECT_ROOT + '/src/definitions/globals/site.less',    // site site base
    PROJECT_ROOT + '/src/definitions/**/*.less',            // all other less

    // exclude busted video module
    '!' + PROJECT_ROOT + '/src/definitions/modules/video.less'
  ],
  assetFiles: [
    // icons
    PROJECT_ROOT + '/src/themes/default/assets/**/icons.{eot,svg,ttf,woff,woff2}',

    // images
    PROJECT_ROOT + '/src/themes/default/assets/**/*.{png,jpg,jpeg,gif,bmp}'
  ]
};
