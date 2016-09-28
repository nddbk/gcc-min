# gcc-min
Transpile and Minify ECMAScript 6 using Google Closure Compiler.

[![NPM](https://badge.fury.io/js/gcc-min.svg)](https://badge.fury.io/js/gcc-min)
![Travis](https://travis-ci.org/ndaidong/gcc-min.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/gcc-min/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/gcc-min?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/57e8df6fbd6fa600512e3a70/badge.svg?style=flat)](https://www.versioneye.com/user/projects/57e8df6fbd6fa600512e3a70)
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


# Test

```
git clone https://github.com/ndaidong/gcc-min.git
cd gcc-min
npm install
npm test
```

# License

The MIT License (MIT)
