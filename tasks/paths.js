module.exports = {
  dist: './dist/',
  definitions: './src/definitions/',
  site: './src/site/',
  variableFiles: './src/site/**/*.variables',
  overrideFiles: './src/site/**/*.overrides',
  lessFiles: [
    './src/definitions/globals/reset.less',   // global reset
    './src/definitions/globals/site.less',    // global site base
    './src/definitions/**/*.less'             // all other less files
  ],
  assetFiles: [
    // icons
    './src/themes/default/assets/**/icons.{eot,svg,ttf,woff,woff2}',

    // images
    './src/themes/default/assets/**/*.{png,jpg,jpeg,gif,bmp}'
  ]
};
