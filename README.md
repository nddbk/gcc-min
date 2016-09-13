# gcc-min
Transpile and Minify ECMAScript 6 using Google Closure Compiler.

[![NPM](https://badge.fury.io/js/gcc-min.svg)](https://badge.fury.io/js/gcc-min)
![Travis](https://travis-ci.org/ndaidong/gcc-min.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/gcc-min/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/gcc-min?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/57d7ae91bf2b4b00342dd062/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/57d7ae91bf2b4b00342dd062)
[![Known Vulnerabilities](https://snyk.io/test/npm/gcc-min/badge.svg)](https://snyk.io/test/npm/gcc-min)


# Usage

```
sudo npm install -g gcc-min
gccmin src/alpha.js dist/alpha.min.js
```

It may be better for local usage:

```
npm install gcc-min --save-dev
./node_modules/.bin/gccmin src/alpha.js dist/alpha.min.js
```

You can add the shortcut to package.json, in the "script" section:

```
"scripts": {
  "test": "tape test/start.js | tap-spec",
  "minify": "gccmin src/alpha.js dist/alpha.min.js"
},
```

So you can run the command to minify:

```
npm run minify
```

# License

The MIT License (MIT)
