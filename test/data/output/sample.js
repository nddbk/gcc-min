/**
 * gcc-min
 * v3.0.1
 * built: Fri, 18 Nov 2016 07:37:23 GMT
 * git: https://github.com/ndaidong/gcc-min
 * author: @ndaidong
 * License: MIT
**/


;(function (name, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    var root = window || {};
    if (root.define && root.define.amd) {
      root.define([], factory);
    } else if (root.exports) {
      root.exports = factory();
    } else {
      root[name] = factory();
    }
  }
})('sampleMath', function () {

  var add = function add(a, b) {
    return a + b;
  };

  var sub = function sub(a, b) {
    return a - b;
  };

  return {
    add: add,
    sub: sub
  };
});