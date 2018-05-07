// rollupify

const debug = require('debug');
const info = debug('gccmin:info');
const error = debug('gccmin:error');

const {rollup} = require('rollup');

const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const cleanup = require('rollup-plugin-cleanup');

const {minify} = require('uglify-es');

const jsminify = (source = '') => {
  info('Minifying...');
  return minify(source, {sourceMap: true});
};

let removeBr = (s) => {
  return s.replace(/(\r\n+|\n+|\r+)/gm, '\n');
};

const rollupify = async (input, name = '') => {
  info('Rollup start...');
  try {
    let bundle = await rollup({
      input,
      plugins: [
        nodeResolve({
          module: true,
          jsnext: true,
          extensions: [
            '.js',
          ],
        }),
        commonjs(),
        babel({
          babelrc: false,
          presets: [
            'es2015-rollup',
          ],
          plugins: [
            'external-helpers',
            'transform-remove-strict-mode',
          ],
        }),
        cleanup(),
      ],
    });

    info('Generating code with bundle...');
    let result = await bundle.generate({
      format: 'umd',
      indent: true,
      name,
    });
    info('Rolling finished.');

    let {code} = result;

    let output = {
      code: removeBr(code),
    };

    let min = jsminify(code);
    if (!min.error) {
      output.minified = min.code;
      output.map = min.map;
    }

    info('Rollupified JS source.');
    return output;
  } catch (err) {
    error(err);
  }
};

module.exports = async (entry, name) => {
  let output = await rollupify(entry, name);
  return output;
};
