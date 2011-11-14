/* global require module */
var template = require('./template')

function reroute (req ,res ,path) {
  res.send(template.process('error'))
}

module.exports = reroute
