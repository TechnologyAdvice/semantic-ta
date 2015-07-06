var path = require('path');
var PROJECT_ROOT = path.dirname(__dirname);

module.exports = {
  root: PROJECT_ROOT,
  dist: PROJECT_ROOT + '/dist',
  src: PROJECT_ROOT + '/src',
  docs: {
    dist: PROJECT_ROOT + '/docs/dist',
    src: PROJECT_ROOT + '/docs/src'
  },
  definitions: PROJECT_ROOT + '/src/definitions',
  site: PROJECT_ROOT + '/src/site',
  componentVariables: [
    PROJECT_ROOT + '/src/site/**/*.variables',
    '!' + PROJECT_ROOT + '/src/site/globals/*.variables'
  ],
  componentOverrides: [
    PROJECT_ROOT + '/src/site/**/*.overrides',
    '!' + PROJECT_ROOT + '/src/site/globals/*.overrides'
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
    PROJECT_ROOT + '/src/definitions/**/*.less'             // all other less files
  ],
  assetFiles: [
    // icons
    PROJECT_ROOT + '/src/themes/default/assets/**/icons.{eot,svg,ttf,woff,woff2}',

    // images
    PROJECT_ROOT + '/src/themes/default/assets/**/*.{png,jpg,jpeg,gif,bmp}'
  ]
};
