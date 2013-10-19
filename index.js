function dockerfile () {
  if (!(this instanceof dockerfile)) {
    return new dockerfile()
  }
  this.file = []
}

var methods = dockerfile.prototype

methods.rem = function (comment) {
  this.file.push(['#', comment])
  return this
}

methods.section = function (title) {
  this.file.push([''],
                 [''],
                 ['#', title]
  )
  return this
}

methods.name = function (name) {
  this.file.push(['#','name', name])
  return this
}

methods.from = function (image) {
  this.file.push(['from', image])
  return this
}

methods.maintainer = function (name) {
  this.file.push(['maintainer', name])
  return this
}

methods.dockerVersion = function (version) {
  this.file.push(['docker-version', version])
  return this
}

methods.version = function (version) {
  this.file.push(['version', version])
  return this
}

methods.run = function (command) {
  this.file.push(['run', command])
  return this
}

methods.cmd = function (command) {
  this.file.push(['cmd', command])
  return this
}

methods.expose = function (ports) {
  ports = [].concat(ports).join(' ')
  this.file.push(['expose', ports])
  return this
}

methods.env = function (key, val) {
  if (typeof key === 'object') {
    var env = key
    for (key in env) {
      this.env(key, env[key])
    }
  } else {
    this.file.push(['env', key, val])
  }
  return this
}

methods.add = function (src, dest) {
  this.file.push(['add', src, dest])
  return this
}

methods.entrypoint = function (command) {
  this.file.push(['entrypoint', command])
  return this
}

methods.volume = function (path) {
  this.file.push(['volume', path])
  return this
}

methods.export = function () {
  var file = this.file.reduce(function (out, line) {
    return out + line.join(' ') + '\n'
  }, '')
  return file
}

module.exports = dockerfile
