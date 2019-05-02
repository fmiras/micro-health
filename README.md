# micro-health
[![NPM version](https://img.shields.io/npm/v/micro-health.svg)](https://www.npmjs.com/package/micro-health)
[![Build Status](https://travis-ci.org/fmiras/micro-health.svg?branch=master)](https://travis-ci.org/fmiras/micro-health)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/micro)
[![Greenkeeper badge](https://badges.greenkeeper.io/fmiras/micro-health.svg)](https://greenkeeper.io/)

micro-health is used as an extension for micro to add the route `/health` to your service. It was meant to implement the Health Check API microservice design pattern for microservices monitoring. For long read I suggest reading [this page](http://microservices.io/patterns/observability/health-check-api.html).

## Usage

```bash
cd my-micro-project/
npm install --save micro-health
```

and add use the package like this:

```javascript
// index.js
const health = require('micro-health')

const microFn = () => 'Hello World'
module.exports = health(microFn)
```

then just run your microservice normally and it will expose a `/health` endpoint.

By default the health request it will return you an HTTP 200 response with a 'success' message and it will fail if the microservice isn't available, this guarantees that your microservice is working or not regardless of the other functions of microservice itself. Also it supports a custom errorChecker:

```javascript
// index.js
const health = require('micro-health')

const microFn = (req, res) => {
  // Wonderful code
}

const errorChecker = async () => {
  // Check if database pool connection is full
  // Check if there is still space on filesystem
  // Check if external APIs are working
  try {
    await customChecking()
   catch (e) {
     return { error: e }
   }
  // You can also return false to pass the health checking
}

module.exports = health(microFn, errorChecker)
```

If error aren't falsy the health request will return an HTTP 500 response with the returned object by the error checker.

There are several tools for health checking such us:
- [Microservice Graph Explorer](https://github.com/hootsuite/microservice-graph-explorer)
- [nginx](https://github.com/nginxinc/NGINX-Demos/tree/master/fun-with-health-checks)
- [CoScale](https://www.coscale.com)

Or... you can just build your own!

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of micro-cacheable, just link it to the dependencies: `npm link micro-health`. Instead of the default one from npm, node will now use your clone of micro-health!

## Credits

Thanks to [ZEIT](https://zeit.co) Team for giving us [micro](https://github.com/zeit/micro) to make our life easier!
