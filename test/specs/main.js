/**
 * Testing
 * @ndaidong
 */

var fs = require('fs');
var path = require('path');
var test = require('tape');

var rootDir = '../../';
var gccmin = require(path.join(rootDir, 'index'));

var hasMethod = (ob, m) => {
  return ob[m] && typeof ob[m] === 'function';
};

test('Testing exported methods', (assert) => {

  assert.ok(hasMethod(gccmin, 'compile'), 'gccmin must have "compile" method');
  assert.end();
});

var devFile = './test/data/development.js';
var proFile = './test/data/output/production.js';
var pkgFake = {
  name: 'gcc-test',
  version: '1.2.3',
  repository: {
    type: 'git',
    url: 'https://github.com/ndaidong/gcc-min'
  },
  author: '@ndaidong',
  license: 'MIT'
};

test('Testing minified result', (assert) => {
  gccmin.compile(devFile, proFile, pkgFake).then(() => {
    assert.ok(fs.existsSync(proFile), 'Production file must be generated');

    let s = fs.readFileSync(proFile, 'utf8');
    let a = s.split('\n');
    assert.ok(s.length > 0 && a.length > 5, 'Production file must be not empty');

    assert.ok(a[1] === ` * ${pkgFake.name}`, 'Package name must be correct');
    assert.ok(a[2] === ` * v${pkgFake.version}`, 'Package version must be correct');
    assert.ok(a[3].startsWith(' * built:'), 'Package built time must be showed');
    assert.ok(a[4] === ` * git: ${pkgFake.repository.url}`, 'Package repository must be correct');
    assert.ok(a[5] === ` * author: ${pkgFake.author}`, 'Package author must be correct');
    assert.ok(a[6] === ` * License: ${pkgFake.license}`, 'Package license must be correct');

    let expectation = ';var add=function(a,b){return a+b},sub=function(a,b){return a-b};module.exports={add:add,sub:sub};'; // eslint-disable-line max-len
    assert.ok(a[8] === expectation, 'Minified code must be correct');
  }).finally(assert.end);
});

test('Test minifying a not-exist file', (assert) => {
  let f = 'devFile.js';
  gccmin.compile(f).catch((err) => {
    assert.deepEquals(err, new Error(`${f} could not be found.`), 'Error must be throwed');
  }).finally(assert.end);
});
