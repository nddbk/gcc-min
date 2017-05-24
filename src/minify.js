/**
 * minify
 * @ndaidong
**/

var {minify} = require('uglify-js');

module.exports = (source = '') => {
  let {code} = minify(source);
  return code;
};
