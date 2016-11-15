/**
 * Smart builder JS code
 * @ndaidong
**/

var fs = require('fs');
var path = require('path');
var exec = require('child_process').execSync;
var bella = require('bellajs');

var parser = require('shift-parser');
var codegen = require('shift-codegen').default;
var babel = require('babel-core');

const TEMPLATE = `
;((name, factory) => {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    let root = window || {};
    if (root.define && root.define.amd) {
      root.define([], factory);
    } else if (root.exports) {
      root.exports = factory();
    } else {
      root[name] = factory();
    }
  }
})('{{globalVar}}', () => {
  {{code}}
});
`;


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

var compile = (opt) => {

  let {
    source,
    target,
    filename,
    globalVar,
    repository: repo,
    author,
    license,
    name,
    description,
    version,
    code
  } = opt;

  let date = bella.date;
  let sd = date.utc();

  let output = filename || name;
  let devOutput = `${target}/${output}.js`;
  let proOutput = `${target}/${output}.min.js`;

  if (fs.existsSync(target)) {
    exec('rm -rf ' + target);
  }
  exec('mkdir ' + target);

  let devFile = path.normalize(devOutput);
  let proFile = path.normalize(proOutput);


  let template = TEMPLATE;

  let glovar = globalVar || name;
  let s = template.replace('{{code}}', code.replace('module.exports =', 'return')).replace('{{globalVar}}', glovar);
  let r = transpile(s);
  let content = r.code;

  let sdev = [
    `/**`,
    ` * ${name}`,
    ` * v${version}`,
    ` * built: ${sd}`,
    ` * ${repo.type}: ${repo.url}`,
    ` * author: ${author}`,
    ` * License: ${license}`,
    `**/\n`,
    content
  ].join('\n');

  fs.writeFileSync(devFile, sdev, 'utf8');

  let min = jsminify(sdev);
  if (!min.startsWith(';')) {
    min = ';' + min;
  }
  if (!min.endsWith(';')) {
    min += ';';
  }

  let spro = [
    `// ${name}@${version}, by ${author} - built on ${sd} - published under ${license} license`,
    min
  ].join('\n');

  fs.writeFileSync(proFile, spro, 'utf8');

  return {
    input: {
      source,
      target,
      filename,
      globalVar,
      repository: repo,
      author,
      license,
      name,
      description,
      version
    },
    output: {
      development: devFile,
      production: proFile
    }
  };
};

module.exports = {
  compile
};
