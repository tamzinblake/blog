/* global module require __dirname */
var template = require('./template')
  , md = require('ghm').parse
  , fs = require('fs')
  , path = require('path')
  , contentRoot = path.resolve(__dirname ,'../content')

function reroute (req ,res ,path) {
  var filename
    , content = ''
    , contentConfig

  filename = contentRoot + '/index.js'
  contentConfig = require(filename)
  contentConfig.filename = contentConfig.filename
                        || contentRoot + '/index.md'
  content = fs.readFileSync(contentConfig.filename ,'utf8')

  res.send(template.process( 'index'
                           , { title: 'Thom Blake - Computer Ethics'
                             , root: '/blog_pub'
                             , content: md(content ,'thomblake/nserver')
                             }
                           ))
}

module.exports = reroute
