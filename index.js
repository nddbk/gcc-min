/**
 * Starting app
 * @ndaidong
**/

var {version} = require('./package');

var build = require('./builder/build');

var main = {
  build,
  version
};

module.exports = main;
