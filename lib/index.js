module.exports = reroute

var template = require('./template')
  , md = require("ghm").parse
  , fs = require('fs')
  , siteConfig = require('./siteConfig')

function reroute (req, res, path) {
  view(req, res, path)
}

function view (req, res, path) {
  var name = path[2] || 'index'
    , filename
    , fileList
    , requireList = []
    , content = ''
    , contentConfig

  try {
    if (name == 'index') {
      fileList = fs.readdirSync(siteConfig.contentRoot)
      for (var i = 0; i < fileList.length; i++) {
        requireList.push(require(siteConfig.contentRoot + fileList[i]))
      }
      requireList.sort(function (a, b) { return a.create_date > b.create_date })
      for (var j = 0; j < siteConfig.numPosts && j < requireList.length; j++) {
        content += fs.readFileSync(contentConfig.filename, 'utf8')
      }
    }
    else {
      filename = siteConfig.contentRoot + '/' + name + '.js'
      contentConfig = require(filename)
      contentConfig.filename = contentConfig.filename
                             || siteConfig.contentRoot + '/' + name + '.md'
      content = fs.readFileSync(contentConfig.filename, 'utf8')
    }
  }
  catch (e) {
  }

  if (!content) {
    filename = siteConfig.contentRoot + '/404.js'
    contentConfig = require(filename)
    contentConfig.filename = contentConfig.filename
                          || siteConfig.contentRoot + '/404.md'
    content = fs.readFileSync(contentConfig.filename, 'utf8')
  }

  res.send(template.process('index', { title: 'Thom Blake - Computer Ethics'
                                     , root: '/blog'
                                     , content: md(content, 'thomblake/blog')
                                     } ))
}
