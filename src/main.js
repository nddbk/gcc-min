/**
 * Transpile & Minify JS code using Google Closure Complier
 * @ndaidong
**/

var fs = require('fs');
var path = require('path');
var exec = require('child_process').execSync;

var bella = require('bellajs');
var request = require('request');

var pack;

if (fs.existsSync('../../../package')) {
  pack = require('../../../package');
} else if (fs.existsSync('../package')) {
  pack = require('../package');
}

const API = 'https://closure-compiler.appspot.com/compile';

const LEVEL = 'SIMPLE_OPTIMIZATIONS';
const INFO = ['compiled_code', 'warnings', 'errors'];
const OUTPUT = 'json';

var log = {
  error: (msg) => {
    console.log('\x1b[31m', msg);
  },
  warn: (msg) => {
    console.log('\x1b[33m', msg);
  },
  success: (msg) => {
    console.log('\x1b[32m', msg);
  }
};

var send = (source) => {
  return new Promise((resolve, reject) => {
    let info = '';
    let arr = [];
    INFO.forEach((item) => {
      arr.push(`output_info=${item}`);
    });
    info = arr.join('&');
    let target = `
      ${API}?compilation_level=${LEVEL}&output_format=${OUTPUT}&${info}
    `;
    let data = {
      js_code: source // eslint-disable-line camelcase
    };

    return request.post(target, {form: data}, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      try {
        let o = JSON.parse(body);
        if (!o) {
          return reject(new Error('Invalid JSON format'));
        }
        return resolve(o);
      } catch (e) {
        return reject(e);
      }
    });
  });
};

var minify = (file, output) => {
  let s = fs.readFileSync(file);
  send(s).then((json) => {
    if (json.errors) {
      log.error(json.errors);
    } else if (json.warnings) {
      log.warn(json.warnings);
    } else {
      let repo = pack.repository;
      let date = bella.date;
      let sd = date.format('m d, Y h:i');
      let x = [
        '/**',
        ` * ${pack.name} v${pack.version}`,
        ` * by ${pack.author}, ${sd}`,
        ` * ${repo.type}: ${repo.url}`,
        ` * License: ${pack.license}`,
        `**/`,
        `;${json.compiledCode}`
      ].join('\n');
      fs.writeFileSync(output, x, 'utf8');
      log.success('File has been minified');
    }
  }).catch((err) => {
    log.error(err);
  });
};


var prepare = (input, output) => {
  if (!fs.existsSync(input)) {
    return false;
  } else if (!path.extname(input)) {
    input += '/main.js';
  }

  if (!path.extname(output)) {
    output += `/${pack.name}.min.js`;
  }
  let dir = path.dirname(output);
  exec('rm -rf ' + dir);
  exec('mkdir ' + dir);

  let i = path.normalize(input);
  let o = path.normalize(output);

  return minify(i, o);
};

module.exports = {
  minify,
  prepare,
  log
};
