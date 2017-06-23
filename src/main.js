#!/usr/bin/env node

/* eslint max-params: 0 */

var fs = require('fs');
var {normalize} = require('path');
var exec = require('child_process').execSync;

var {
  writeFile,
  rollupify
} = require('../builder');

var release = (result, mname, fileName = '', outputDir = './', pack = {}) => {

  let output = normalize(outputDir);

  let releaseAt = (new Date()).toUTCString();

  let {
    name,
    version,
    author,
    repository,
    license
  } = pack;

  let minHeader = `// ${name}@${version}, by ${author} - built on ${releaseAt} - published under ${license} license`;

  let fullHeader = [
    `/**`,
    ` * ${name}@${version}`,
    ` * built on: ${releaseAt}`,
    ` * repository: ${repository.url}`,
    ` * maintainer: ${author}`,
    ` * License: ${license}`,
    `**/`
  ].join('\n');

  if (fs.existsSync(output)) {
    exec('rm -rf ' + output);
  }
  exec(`mkdir ${output}`);

  let {
    code,
    minified,
    map: sourceMap
  } = result;

  let fname = fileName || mname;

  writeFile(`${output}/${fname}.js`, [fullHeader, code].join('\n'));

  if (result.minified) {
    writeFile(`${output}/${fname}.min.js`, [minHeader, minified].join('\n'));
  }

  if (result.map) {
    writeFile(`${output}/${fname}.min.map`, sourceMap);
  }
};


module.exports = async (entryFile, mname, fname, output, pack) => {
  let entry = normalize(entryFile);
  let result = await rollupify(entry, mname);
  release(result, mname, fname, output, pack);
};

