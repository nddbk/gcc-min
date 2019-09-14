/**
 * math@1.0.0
 * built on: Sat, 14 Sep 2019 14:51:04 GMT
 * repository: https://somewhere.com/math
 * maintainer: @ndaidong
 * License: MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.xMath = {}));
}(this, function (exports) {
  const add = (a, b) => {
    return a + b;
  };

  const sub = (a, b) => {
    return a - b;
  };

  const version = "1.0.0";
  const name = "math";
  const description = "Simple math";
  const main = "./index.js";
  const engines = {
    node: ">= 7.6"
  };
  const repository = {
    type: "git",
    url: "https://somewhere.com/math"
  };
  const author = "@ndaidong";
  const license = "MIT";
  var pkg = {
    version: version,
    name: name,
    description: description,
    main: main,
    engines: engines,
    repository: repository,
    author: author,
    license: license
  };

  const compose = (...fns) => {
    return fns.reduce((f, g) => (x) => f(g(x)));
  };
  const pipe = (...fns) => {
    return fns.reduceRight((f, g) => (x) => f(g(x)));
  };
  const curry = (fn) => {
    const totalArguments = fn.length;
    const next = (argumentLength, rest) => {
      if (argumentLength > 0) {
        return (...args) => {
          return next(
            argumentLength - args.length,
            [
              ...rest,
              ...args,
            ]
          );
        };
      }
      return fn(...rest);
    };
    return next(totalArguments, []);
  };
  const tMap = new Map();
  const tSet = new Set();
  const getPackage = () => {
    return pkg;
  };

  exports.add = add;
  exports.compose = compose;
  exports.curry = curry;
  exports.getPackage = getPackage;
  exports.pipe = pipe;
  exports.sub = sub;
  exports.tMap = tMap;
  exports.tSet = tSet;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
