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

var source = './test/data/sample-math.js';
var target = './test/data/output';
var fname = 'sample';
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
  gccmin.compile(source, target, fname, pkgFake).then((output) => {

    let dev = `${output.devFile}`;
    let pro = `${output.proFile}`;

    assert.ok(fs.existsSync(dev), 'Development file must be generated');
    assert.ok(fs.existsSync(pro), 'Production file must be generated');

    let s = fs.readFileSync(dev, 'utf8');
    let a = s.split('\n');
    assert.ok(s.length > 0 && a.length > 5, 'Development file must be not empty');

    assert.ok(a[1] === ` * ${output.fname}`, 'Package name must be correct');
    assert.ok(a[2] === ` * v${pkgFake.version}`, 'Package version must be correct');
    assert.ok(a[3].startsWith(' * built:'), 'Package built time must be showed');
    assert.ok(a[4] === ` * git: ${pkgFake.repository.url}`, 'Package repository must be correct');
    assert.ok(a[5] === ` * author: ${pkgFake.author}`, 'Package author must be correct');
    assert.ok(a[6] === ` * License: ${pkgFake.license}`, 'Package license must be correct');

  }).catch((err) => {
    console.log(err);
  }).finally(assert.end);
});

test('Test minifying a not-exist file', (assert) => {
  let f = 'devFile.js';
  gccmin.compile(f).catch((err) => {
    assert.deepEquals(err, new Error(`${f} could not be found.`), 'Error must be throwed');
  }).catch((err) => {
    console.log(err);
  }).finally(assert.end);
});
