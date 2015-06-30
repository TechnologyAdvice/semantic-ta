module.exports = {
  dist: './dist/',
  definitions: './src/definitions/',
  site: './src/site/',
  lessFiles: [
    './src/definitions/globals/reset.less',
    './src/definitions/globals/site.less',
    './src/definitions/elements/**/*.less',
    './src/definitions/collections/**/*.less',
    './src/definitions/views/**/*.less',
    './src/definitions/modules/**/*.less'
  ],
  assetFiles: [
    // icons
    './src/themes/default/assets/**/*.eot',
    './src/themes/default/assets/**/*.svg',
    './src/themes/default/assets/**/*.ttf',
    './src/themes/default/assets/**/*.woff',
    './src/themes/default/assets/**/*.woff2',

    // images
    './src/themes/default/assets/**/*.png',
    './src/themes/default/assets/**/*.jpg',
    './src/themes/default/assets/**/*.jpeg',
    './src/themes/default/assets/**/*.gif',
    './src/themes/default/assets/**/*.bmp'
  ]
};
