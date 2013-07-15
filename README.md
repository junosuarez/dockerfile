# dockerfile
work with Dockerfiles from Docker.io

## usage
```js
var dockerfile = require('dockerfile')

dockerfile()
  .name('test')
  .rem('a test Dockerfile')
  .version('0.5.3')
  .dockerVersion('0.4.8')
  .maintainer('jden <jason@denizac.org>')
  .from('ubuntu:12.10')
  .section('install stuff')
    .run('apt-get install curl')
  .section('add some stuff')
    .add('/src', '/dest')
  .section('runtime')
    .env({
      mode: 'PROD',
      needs_nachos: 'true'
    })
    .entrypoint('/bin/node ./index.js')
  .export()
```
## api

Implements the [Docker Builder](http://docs.docker.io/en/latest/use/builder/) interface.

Additionally, we support

- `.name()`: give your container a name (should match what you tag it with)
- `.rem(comment)`: add a 1-line comment
- `.section(title)`: break up your file with some new lines & a comment


## installation

    $ npm install dockerfile


## running the tests

From package root:

    $ npm install
    $ npm test

## todo

- add parse support / JSON ast format

## contributors

- jden <jason@denizac.org>


## license

MIT. (c) 2013 AgileMD. See LICENSE.md
