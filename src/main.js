#!/usr/bin/env node

/* eslint max-params: 0 */

const {existsSync} = require('fs');
const {normalize} = require('path');
const {execSync} = require('child_process');

const {
  writeFile,
  rollupify,
} = require('../builder');

const release = (result, mname, fileName = '', outputDir = './', pack = {}) => {
  let output = normalize(outputDir);

  let releaseAt = (new Date()).toUTCString();

  let {
    name,
    version,
    author,
    repository,
    license,
  } = pack;

  let minHeader = `// ${name}@${version}, by ${author} - built on ${releaseAt} - published under ${license} license`;

  let fullHeader = [
    `/**`,
    ` * ${name}@${version}`,
    ` * built on: ${releaseAt}`,
    ` * repository: ${repository.url}`,
    ` * maintainer: ${author}`,
    ` * License: ${license}`,
    `**/`,
  ].join('\n');

  if (existsSync(output)) {
    execSync('rm -rf ' + output);
  }
  execSync(`mkdir ${output}`);

  let {
    code,
    minified,
    map: sourceMap,
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

