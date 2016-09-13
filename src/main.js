/**
 * Transpile & Minify JS code using Google Closure Complier
 * @ndaidong
**/

var fs = require('fs');
var path = require('path');
var exec = require('child_process').execSync;
var bella = require('bellajs');
var Promise = require('promise-wtf');

var compiler = require('google-closure-compiler-js');

const LEVEL = 'SIMPLE_OPTIMIZATIONS';
const LANG_IN = 'ES6';
const LANG_OUT = 'ES5';

var pack;

try {
  pack = require('../../../package');
} catch (e) {
  pack = require('../package');
  pack.__e__ = e;
}

var handle = (file, output, pkg = {}) => {

  let s = '';
  let r = {};

  return Promise.series([
    (next) => {
      fs.readFile(file, 'utf8', (err, content) => {
        if (err) {
          console.log(err);
        }
        s = content;
        next();
      });
    },
    (next) => {
      r = compiler.compile({
        compilationLevel: LEVEL,
        languageIn: LANG_IN,
        languageOut: LANG_OUT,
        jsCode: [{src: s}]
      });
      next();
    },
    (next) => {
      let repo = pkg.repository || pack.repository;
      let auth = pkg.author || pack.author;
      let lice = pkg.license || pack.license;
      let name = pkg.name || pack.name;
      let vers = pkg.version || pack.version;
      let date = bella.date;
      let sd = date.utc();

      r.fileContent = [
        `/**`,
        ` * ${name}`,
        ` * v${vers}`,
        ` * built: ${sd}`,
        ` * ${repo.type}: ${repo.url}`,
        ` * author: ${auth}`,
        ` * License: ${lice}`,
        `**/`,
        `;${r.compiledCode}`
      ].join('\n');
      next();
    },
    (next) => {
      fs.writeFile(output, r.fileContent, 'utf8', (err) => {
        if (err) {
          console.log(err);
        }
        next();
      });
    }
  ]);
};


var compile = (input, output, pkg = {}) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(input)) {
      return reject(new Error(`${input} could not be found.`));
    }
    if (!path.extname(input)) {
      input += '/main.js';
    }
    let name = pkg.name || pack.name;

    if (!path.extname(output)) {
      output += `/${name}.min.js`;
    }
    let dir = path.dirname(output);
    exec('rm -rf ' + dir);
    exec('mkdir ' + dir);

    let i = path.normalize(input);
    let o = path.normalize(output);

    return resolve(handle(i, o, pkg));
  });
};

module.exports = {
  compile
};
