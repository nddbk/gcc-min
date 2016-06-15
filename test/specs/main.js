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

test('Testing gccmin.log', (assert) => {
  assert.ok(gccmin.log, 'gccmin must have "log" as sub object');
  let log = gccmin.log;
  assert.ok(hasMethod(log, 'success'), 'gccmin.log must have "info" method');
  assert.ok(hasMethod(log, 'error'), 'gccmin.log must have "error" method');
  assert.ok(hasMethod(log, 'warn'), 'gccmin.log must have "warn" method');
  assert.end();
});
