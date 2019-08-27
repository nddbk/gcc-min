/**
 * math@1.0.0
 * built on: Tue, 27 Aug 2019 15:06:41 GMT
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

  exports.add = add;
  exports.compose = compose;
  exports.curry = curry;
  exports.pipe = pipe;
  exports.sub = sub;
  exports.tMap = tMap;
  exports.tSet = tSet;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
