// rollupify

const debug = require('debug');
const info = debug('gccmin:info');
const error = debug('gccmin:error');

const {rollup} = require('rollup');

const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const cleanup = require('rollup-plugin-cleanup');

const {minify} = require('uglify-es');

const jsminify = (source = '') => {
  info('Minifying...');
  return minify(source, {sourceMap: true});
};

const removeBr = (s) => {
  return s.replace(/(\r\n+|\n+|\r+)/gm, '\n');
};

const rollupify = async (input, name = '') => {
  info('Rollup start...');
  try {
    const bundle = await rollup({
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
        cleanup(),
      ],
    });

    info('Generating code with bundle...');
    const result = await bundle.generate({
      format: 'umd',
      indent: true,
      name,
    });
    info('Rolling finished.');

    const {code} = result;

    const output = {
      code: removeBr(code),
    };

    const min = jsminify(code);
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
  const output = await rollupify(entry, name);
  return output;
};
