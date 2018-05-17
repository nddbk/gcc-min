/**
 * math@1.0.0
 * built on: Thu, 17 May 2018 09:01:58 GMT
 * repository: https://somewhere.com/math
 * maintainer: @ndaidong
 * License: MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.xMath = {})));
}(this, (function (exports) { 'use strict';
  let add = (a, b) => {
    return a + b;
  };
  let sub = (a, b) => {
    return a - b;
  };
  const compose = (...fns) => {
    return fns.reduce((f, g) => (x) => f(g(x)));
  };
  const pipe = (...fns) => {
    return fns.reduceRight((f, g) => (x) => f(g(x)));
  };
  const curry = (fn) => {
    let totalArguments = fn.length;
    let next = (argumentLength, rest) => {
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
  exports.compose = compose;
  exports.pipe = pipe;
  exports.curry = curry;
  exports.tMap = tMap;
  exports.tSet = tSet;
  exports.add = add;
  exports.sub = sub;
  Object.defineProperty(exports, '__esModule', { value: true });
})));
