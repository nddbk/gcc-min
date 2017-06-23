/**
 * Check built-files to ensure they have been regenated correctly
 * @ndaidong
 */

var fs = require('fs');
var test = require('tape');

var {
  isFunction
} = require('bellajs');

var pkgFake = require('../data/package.json');
var proFile = './test/data/output/math.js';
var devFile = './test/data/output/math.min.js';
var mapFile = './test/data/output/math.min.map';

var proMath = require('../data/output/math');
var devMath = require('../data/output/math.min');


test('Validate production output', (assert) => {
  assert.ok(fs.existsSync(proFile), 'Production file must be generated');
  assert.ok(fs.existsSync(mapFile), 'Map file must be generated');

  let s = fs.readFileSync(proFile, 'utf8');
  let a = s.split('\n');
  assert.ok(s.length > 0 && a.length > 5, 'Production file must be not empty');

  assert.ok(a[1] === ` * ${pkgFake.name}@${pkgFake.version}`, 'Package name must be correct');
  assert.ok(a[2].startsWith(' * built on:'), 'Package built time must be showed');
  assert.ok(a[3] === ` * repository: ${pkgFake.repository.url}`, 'Package repository must be correct');
  assert.ok(a[4] === ` * maintainer: ${pkgFake.author}`, 'Package author must be correct');
  assert.ok(a[5] === ` * License: ${pkgFake.license}`, 'Package license must be correct');

  assert.end();
});

test('Validate development output', (assert) => {
  assert.ok(fs.existsSync(devFile), 'Development file must be generated');

  let s = fs.readFileSync(devFile, 'utf8');
  let a = s.split('\n');
  assert.ok(s.length > 0 && a.length > 1, 'Development file must be not empty');
  let cmt = a[0];
  let pack = `${pkgFake.name}@${pkgFake.version}`;
  assert.ok(cmt.includes(pack), 'Package must be presented with name and version');
  let author = `${pkgFake.author}`;
  assert.ok(cmt.includes(author), 'Package author must be correct');
  let license = `${pkgFake.license}`;
  assert.ok(cmt.includes(license), 'Package license must be correct');

  assert.end();
});


var checkOutput = (math) => {
  test('Validate built module', (assert) => {
    assert.ok(isFunction(math.add), 'Module must have method "add"');
    assert.ok(isFunction(math.sub), 'Module must have method "sub"');
    assert.end();
  });
};

[proMath, devMath].map(checkOutput);
