#!/usr/bin/env node

var {join, normalize} = require('path');

var minimist = require('minimist');

var argv = minimist(process.argv.slice(2));
var entry = argv.entry || argv.e;
var mname = argv.name || argv.n;
var fname = argv.file || argv.f;
var output = argv.output || argv.o;
var pkg = argv.package || argv.p;

var build = require('../src/main');

let fullPath = __dirname;
let subDir = '/node_modules/gcc-min/builder';
if (fullPath.includes(subDir)) {
  fullPath = fullPath.replace(subDir, '');
}

var getPackage = (file = 'package.json') => {
  let f = join(fullPath, normalize(file));
  return require(f);
};

let pack = getPackage(pkg);
if (pack) {
  entry = join(fullPath, normalize(entry));
  output = join(fullPath, normalize(output));
  build(entry, mname, fname, output, pack);
}

module.exports = {
  build
};
