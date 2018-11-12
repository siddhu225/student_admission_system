
# isarray

`Array#isArray` for older browsers.

[![build status](https://secure.travis-ci.org/juliangruber/isarray.svg)](http://travis-ci.org/juliangruber/isarray)
[![downloads](https://img.shields.io/npm/dm/isarray.svg)](https://www.npmjs.org/package/isarray)

[![browser support](https://ci.testling.com/juliangruber/isarray.png)
](https://ci.testling.com/juliangruber/isarray)

## Usage

```js
var isArray = require('isarray');

console.log(isArray([])); // => true
console.log(isArray({})); // => false
```

## Installation

With [npm](http://npmjs.org) do

```bash
$ npm install isarray
```

Then bundle for the browser with
[browserify](https://github.com/substack/browserify).

With [component](http://component.io) do

```bash
$ component install juliangruber/isarray
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this per