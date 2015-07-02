module.exports = {
  dist: './dist/',
  docs: {
    dist: './docs/dist/',
    src: './docs/src/'
  },
  definitions: './src/definitions/',
  site: './src/site/',
  lessFiles: [
    // must build reset and site first
    './src/definitions/globals/reset.less',   // site reset
    './src/definitions/globals/site.less',    // site site base
    './src/definitions/**/*.less',            // all other less files

    // .variables and .overrides are replaced with their corresponding .less
    //  definition file during build. We add them so they are watched and
    // trigger rebuilds of their corresponding less files.
    './src/site/**/*.variables',              // variables files
    './src/site/**/*.overrides'               // overrides files
  ],
  assetFiles: [
    // icons
    './src/themes/default/assets/**/icons.{eot,svg,ttf,woff,woff2}',

    // images
    './src/themes/default/assets/**/*.{png,jpg,jpeg,gif,bmp}'
  ]
};
