#!/usr/bin/env node

var {join, normalize} = require('path');

var minimist = require('minimist');

var argv = minimist(process.argv.slice(2));
var entry = argv.entry || argv.e;
var mname = argv.name || argv.n;
var output = argv.output || argv.o;
var pkg = argv.package || argv.p;

var build = require('../src/main');

var getPackage = (file = 'package.json') => {
  return require(join(__dirname, normalize(`${file}`)));
};

let pack = getPackage(pkg);
if (pack) {
  build(entry, mname, output, pack);
}

module.exports = {
  build
};
