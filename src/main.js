/**
 * Smart builder JS code
 * @ndaidong
**/

var fs = require('fs');
var path = require('path');
var exec = require('child_process').execSync;
var bella = require('bellajs');
var Promise = require('promise-wtf');

var parser = require('shift-parser');
var codegen = require('shift-codegen').default;
var babel = require('babel-core');

var pack;

try {
  pack = require('../../../package');
} catch (e) {
  pack = require('../package');
  pack.__e__ = e;
}

var transpile = (code) => {
  return babel.transform(code, {
    presets: [
      [
        'env', {
          targets: {
            browsers: [
              'safari 9',
              'ie 11',
              'Android 4',
              'iOS 7'
            ]
          }
        }
      ]
    ],
    plugins: [
      'transform-remove-strict-mode'
    ],
    comments: false,
    sourceMaps: true
  });
};

var jsminify = (code) => {
  let ast = parser.parseScript(code);
  return codegen(ast);
};

var compile = (source, target, fname = '', pkg = {}) => {
  return new Promise((resolve, reject) => {

    if (!fs.existsSync(source)) {
      return reject(new Error(`${source} could not be found.`));
    }
    if (!path.extname(source)) {
      source += '/main.js';
    }

    let repo = pkg.repository || pack.repository;
    let auth = pkg.author || pack.author;
    let lice = pkg.license || pack.license;
    let name = fname || pkg.name || pack.name;
    let vers = pkg.version || pack.version;
    let date = bella.date;
    let sd = date.utc();

    let devOutput = `${target}/${name}.js`;
    let proOutput = `${target}/${name}.min.js`;

    if (!fs.existsSync(target)) {
      exec('mkdir ' + target);
    }

    let stat = fs.statSync(target);
    if (stat.isDirectory()) {
      exec('rm -rf ' + target);
      exec('mkdir ' + target);
    }

    let input = path.normalize(source);
    let devFile = path.normalize(devOutput);
    let proFile = path.normalize(proOutput);


    let content = fs.readFileSync(input, 'utf8');

    let r = transpile(content);
    let code = r.code;

    let sdev = [
      `/**`,
      ` * ${name}`,
      ` * v${vers}`,
      ` * built: ${sd}`,
      ` * ${repo.type}: ${repo.url}`,
      ` * author: ${auth}`,
      ` * License: ${lice}`,
      `**/\n`,
      code
    ].join('\n');

    fs.writeFileSync(devFile, sdev, 'utf8');

    let x = jsminify(code);
    if (!x.startsWith(';')) {
      x = ';' + x;
    }
    if (!x.endsWith(';')) {
      x += ';';
    }

    let spro = [
      `// ${name}@${vers}, by ${auth} - built on ${sd} - published under ${lice} license`,
      x
    ].join('\n');

    fs.writeFileSync(proFile, spro, 'utf8');

    return resolve({
      source: input,
      devFile,
      proFile,
      fname
    });
  });
};

module.exports = {
  compile
};
