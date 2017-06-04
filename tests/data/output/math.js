/**
 * math@1.0.0
 * built on: Sun, 04 Jun 2017 12:28:58 GMT
 * repository: https://somewhere.com/math
 * maintainer: @ndaidong
 * License: MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.math = global.math || {})));
}(this, (function (exports) { 'use strict';
  var add = function add(a, b) {
    return a + b;
  };
  var sub = function sub(a, b) {
    return a - b;
  };
  exports.add = add;
  exports.sub = sub;
  Object.defineProperty(exports, '__esModule', { value: true });
})));
