var template = require('./template')
function reroute (req, res, path) {
  view(req, res, path)
}

function view (req, res, path) {
  res.send(template.process('error'))
}

module.exports = reroute
