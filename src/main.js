#!/usr/bin/env node

var fs = require('fs');
var {normalize} = require('path');
var exec = require('child_process').execSync;

var {
  writeFile,
  rollupify
} = require('../builder');

var release = (result, mname, outputDir, pack) => {

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

  writeFile(`${output}/${mname}.js`, [fullHeader, code].join('\n'));

  if (result.minified) {
    writeFile(`${output}/${mname}.min.js`, [minHeader, minified].join('\n'));
  }

  if (result.map) {
    writeFile(`${output}/${mname}.min.map`, sourceMap);
  }
};


module.exports = async (entryFile, mname, output, pack) => {
  let entry = normalize(entryFile);
  let result = await rollupify(entry, mname);
  release(result, mname, output, pack);
};

