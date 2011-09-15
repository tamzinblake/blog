module.exports = reroute

var template = require('./template')
  , md = require("github-flavored-markdown").parse
  , fs = require('fs')
  , siteConfig = require('./siteConfig')

function reroute (req, res, path) {
  view(req, res, path)
}

function view (req, res, path) {
  var name = path[2] || 'index'
    , filename = siteConfig.contentRoot + '/' + name + '.md'
    , content
  try {
    content = fs.readFileSync(filename, 'utf8')
  }
  catch (e) {
  }

  if (!content) {
    filename = siteConfig.contentRoot + '/404.md'
    content = fs.readFileSync(filename, 'utf8')
  }

  res.send(template.process('index', { title: 'Thom Blake - Computer Ethics'
                                     , root: '/blog'
                                     , content: md(content)
                                     } ))
}
