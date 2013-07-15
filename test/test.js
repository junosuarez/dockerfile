var chai = require('chai')
chai.should()
chai.use(require('chai-interface'))
var heredoc = require('heredoc')

describe('dockerfile', function () {
  var dockerfile = require('../')

  it('has interface', function () {
    dockerfile().should.have.interface({
      rem: Function,
      section: Function,
      from: Function,
      maintainer: Function,
      version: Function,
      run: Function,
      cmd: Function,
      expose: Function,
      env: Function,
      add: Function,
      entrypoint: Function,
      volume: Function,
      export: Function
    })
  })

  it('returns isntanceof dockerfile', function () {
    dockerfile().should.be.instanceof(dockerfile)
  })

  it('exports', function () {
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
    .should.equal(heredoc(function () {/*
# name test
# a test Dockerfile
version 0.5.3
docker-version 0.4.8
from jden <jason@denizac.org>
from ubuntu:12.10


# install stuff
run apt-get install curl


# add some stuff
add /src /dest


# runtime
env mode PROD
env needs_nachos true
entrypoint /bin/node ./index.js
*/}))

  })
})