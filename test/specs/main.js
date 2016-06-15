/**
 * Testing
 * @ndaidong
 */

var path = require('path');
var test = require('tape');

var rootDir = '../../';
var gccmin = require(path.join(rootDir, 'index.js'));

var hasMethod = (ob, m) => {
  return ob[m] && typeof ob[m] === 'function';
};

test('Testing basic methods', (assert) => {

  assert.ok(hasMethod(gccmin, 'minify'), 'gccmin must have "minify" method');
  assert.ok(hasMethod(gccmin, 'prepare'), 'gccmin must have "prepare" method');
  assert.end();
});
