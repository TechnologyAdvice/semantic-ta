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

    // then all other less files
    './src/definitions/**/*.less',

    // .variables and .overrides are substituted for their corresponding
    //  definition .less file during build.
    //
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
