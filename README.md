[![npm package](https://badge.fury.io/js/httpr-provider-node-request.svg)](https://badge.fury.io/js/httpr-provider-node-request)
[![Build Status](https://travis-ci.org/RecuencoJones/httpr-provider-node-request.png?branch=develop)](https://travis-ci.org/RecuencoJones/httpr-provider-node-request)

# httpr-provider-node-request

Httpr provider implementation for node requests with [request](https://npmjs.com/package/request).

## Import

The library requires a peer of Httpr and request.

### ES6 import

```
import {Httpr} from 'httpr';
import {NodeRequestProvider} from 'httpr-provider-node-request';

const http = new Httpr({
  provider: new NodeRequestProvider()
});
```

### Commonjs

```
const Httpr = require('httpr').Httpr;
const NodeRequestProvider = require('httpr-provider-node-request').NodeRequestProvider;

const http = new Httpr({
  provider: new NodeRequestProvider()
});
```

## Type Definitions

For TypeScript usage, a file with type definitions is bundled in npm.

This file is generated using [barrel-defgen](https://github.com/RecuencoJones/barrel-defgen).

## Building

```
npm install
npm run build
```

These commands will setup the package and generate the distributable files as well as the type definitions.

Other tasks:

- `npm run build:umd` - generate library bundle.
- `npm run build:min` - generate minified library bundle.
- `npm run build:defs` - generate definitions from barrel to `defs` directory.
- `npm run clean` - remove generated directories.
- `npm run lint` - check style of source files.
- `npm run doc` - generate documentation from sources to `doc` directory.
- `npm run test` - run all test suites.
- `npm run test:unit` - run unit tests only.
