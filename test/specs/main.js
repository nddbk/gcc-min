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

var getPackage = () => {
  let content = fs.readFileSync('./package.json', 'utf8');
  return JSON.parse(content) || null;
};

test('Testing exported methods', (assert) => {

  assert.ok(hasMethod(gccmin, 'compile'), 'gccmin must have "compile" method');
  assert.end();
});

var pack = getPackage();

let conf = pack.gccmin;
let {
  repository,
  author,
  license,
  name,
  description,
  version
} = pack;

Object.assign(conf, {
  repository,
  author,
  license,
  name,
  description,
  version
});

conf.code = fs.readFileSync(conf.source.replace('./', ''), 'utf8');

test('Testing minified result', (assert) => {

  let result = gccmin.compile(conf);
  let output = result.output;

  let dev = `${output.development}`;
  let pro = `${output.production}`;

  assert.ok(fs.existsSync(dev), 'Development file must be generated');
  assert.ok(fs.existsSync(pro), 'Production file must be generated');

  let s = fs.readFileSync(dev, 'utf8');
  let a = s.split('\n');
  assert.ok(s.length > 0 && a.length > 5, 'Development file must be not empty');

  assert.ok(a[1] === ` * ${conf.name}`, 'Package name must be correct');
  assert.ok(a[2] === ` * v${version}`, 'Package version must be correct');
  assert.ok(a[3].startsWith(' * built:'), 'Package built time must be showed');
  assert.ok(a[4] === ` * git: ${repository.url}`, 'Package repository must be correct');
  assert.ok(a[5] === ` * author: ${author}`, 'Package author must be correct');
  assert.ok(a[6] === ` * License: ${license}`, 'Package license must be correct');

  assert.end();
});
