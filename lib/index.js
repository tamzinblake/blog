module.exports = reroute

var template = require('./template')

function reroute (req, res, path) {
  view(req, res, path)
}

function view (req, res, path) {
  res.send(template.process('index', { title: 'Thom Blake - Computer Ethics'
                                     , root: '/blog'
                                     } ))
}
