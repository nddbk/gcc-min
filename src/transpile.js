/**
 * Smart builder JS code
 * @ndaidong
**/

var babel = require('babel-core');

var transpile = (code) => {
  return babel.transform(code, {
    presets: [
      [
        'env', {
          targets: {
            browsers: [
              'last 2 versions',
              'safari 9',
              'ie 11',
              'Android 4',
              'iOS 7'
            ]
          }
        }
      ]
    ],
    plugins: [
      'transform-remove-strict-mode'
    ],
    comments: false,
    sourceMaps: false
  });
};

module.exports = transpile;
