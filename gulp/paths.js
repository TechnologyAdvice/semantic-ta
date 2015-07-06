var PROJECT_ROOT = __dirname + '/../';
module.exports = {
  root: PROJECT_ROOT,
  dist: PROJECT_ROOT + '/dist/',
  docs: {
    dist: PROJECT_ROOT + '/docs/dist/',
    src: PROJECT_ROOT + '/docs/src/'
  },
  definitions: PROJECT_ROOT + '/src/definitions/',
  site: PROJECT_ROOT + '/src/site/',
  lessFiles: [
    // must build reset and site first
    PROJECT_ROOT + '/src/definitions/globals/reset.less',   // site reset
    PROJECT_ROOT + '/src/definitions/globals/site.less',    // site site base
    PROJECT_ROOT + '/src/definitions/**/*.less',            // all other less files

    // .variables and .overrides are replaced with their corresponding .less
    //  definition file during build. We add them so they are watched and
    // trigger rebuilds of their corresponding less files.
    PROJECT_ROOT + '/src/site/**/*.variables',              // variables files
    PROJECT_ROOT + '/src/site/**/*.overrides'               // overrides files
  ],
  assetFiles: [
    // icons
    PROJECT_ROOT + '/src/themes/default/assets/**/icons.{eot,svg,ttf,woff,woff2}',

    // images
    PROJECT_ROOT + '/src/themes/default/assets/**/*.{png,jpg,jpeg,gif,bmp}'
  ]
};
