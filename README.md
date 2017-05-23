# gcc-min
Just write scripts for Node.js environment, then build to use in the browsers.

[![NPM](https://badge.fury.io/js/gcc-min.svg)](https://badge.fury.io/js/gcc-min)
[![Build Status](https://travis-ci.org/ndaidong/gcc-min.svg?branch=master)](https://travis-ci.org/ndaidong/gcc-min)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/gcc-min/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/gcc-min?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/gcc-min.svg)](https://gemnasium.com/github.com/ndaidong/gcc-min)
[![NSP Status](https://nodesecurity.io/orgs/techpush/projects/1423652f-9450-40d0-9df6-1d54b2312441/badge)](https://nodesecurity.io/orgs/techpush/projects/1423652f-9450-40d0-9df6-1d54b2312441)


# Usage

In order to use gcc-min, please follow the steps as below:

#### 1, Install and save gcc-min to devDependencies

```
npm install gcc-min --save-dev
```

#### 2, Update package.json with *gccmin* property

```
"gccmin": {
  "source": "PATH_TO_SOURCE_FILE",
  "target": "WHERE_TO_OUTPUT",
  "filename": "NAME_OF_OUTPUT_FILE",
  "globalVar": "GLOBAL_VAR_NAME"
}
```

#### 3, Add shortcut command to the "script" section

```
"scripts": {
  "build": "gccmin"
},
```

So you can run the command to build:

```
npm run build
```

It will parse your package.json file, get the values in "gccmin" then build the module with these specified configurations.


For better understanding, please refer [this live example](https://github.com/ndaidong/bellajs/blob/master/package.json).


# Test

```
git clone https://github.com/ndaidong/gcc-min.git
cd gcc-min
npm install
npm test
```

# License

The MIT License (MIT)
