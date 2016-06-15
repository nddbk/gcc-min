# gcc-min
Transpile and Minify ECMAScript 6 using Google Closure Compiler.

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
  "test": "./node_modules/.bin/tape test/start.js | tap-spec",
  "minify": "./node_modules/.bin/gccmin src/alpha.js dist/alpha.min.js"
},
```

So you can run the command to minify:

```
npm run minify
```

# License

The MIT License (MIT)
