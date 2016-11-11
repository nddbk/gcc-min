# gcc-min
Transpile and Minify ECMAScript 6 using Google Closure Compiler.

[![NPM](https://badge.fury.io/js/gcc-min.svg)](https://badge.fury.io/js/gcc-min)
[![Build Status](https://travis-ci.org/ndaidong/gcc-min.svg?branch=master)](https://travis-ci.org/ndaidong/gcc-min)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/gcc-min/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/gcc-min?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/gcc-min.svg)](https://gemnasium.com/github.com/ndaidong/gcc-min)
[![Known Vulnerabilities](https://snyk.io/test/npm/gcc-min/badge.svg)](https://snyk.io/test/npm/gcc-min)


# Usage

```
gccmin SOURCE_FILE OUTPUT_DIR EXPORT_NAME
```

Example:

```
sudo npm install -g gcc-min
gccmin src/alpha.js dist alpha
```

It may be better for local usage:

```
npm install gcc-min --save-dev
./node_modules/.bin/gccmin src/alpha.js dist alpha
```

You can add the shortcut to package.json, in the "script" section:

```
"scripts": {
  "test": "tape test/start.js | tap-spec",
  "build": "gccmin src/alpha.js dist alpha"
},
```

So you can run the command to minify:

```
npm run build
```

It will create folder "dist", and put 2 files alpha.js and alpha.min.js into there.


# Test

```
git clone https://github.com/ndaidong/gcc-min.git
cd gcc-min
npm install
npm test
```

# License

The MIT License (MIT)
