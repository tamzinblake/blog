/* global module require __dirname */
module.exports = reroute

var template = require('./template')
  , md = require('ghm').parse
  , fs = require('fs')
  , path = require('path')
  , contentRoot = path.resolve(__dirname ,'../content')
  , numPosts = 5

function reroute (req ,res ,path) {
  var name = path[2] || ''
    , filename
    , fileList
    , requireList = []
    , content = ''
    , contentConfig

  try {
    if (name == '') {
      fileList = fs.readdirSync(contentRoot)
      for (var i = 0 ;i < fileList.length ;i++) {
        requireList.push(require(contentRoot + fileList[i]))
      }
      requireList.sort(function (a ,b) { return a.create_date > b.create_date })
      for (var j = 0 ;j < numPosts && j < requireList.length ;j++) {
        content += fs.readFileSync(contentConfig.filename ,'utf8')
      }
    }
    else {
      filename = contentRoot + '/' + name + '.js'
      contentConfig = require(filename)
      contentConfig.filename = contentConfig.filename
                            || contentRoot + '/' + name + '.md'
      content = fs.readFileSync(contentConfig.filename ,'utf8')
    }
  }
  catch (e) {
  }

  if (!content) {
    filename = contentRoot + '/404.js'
    contentConfig = require(filename)
    contentConfig.filename = contentConfig.filename
                          || contentRoot + '/404.md'
    content = fs.readFileSync(contentConfig.filename ,'utf8')
  }

  res.send(template.process( 'index'
                           , { title: 'Thom Blake - Computer Ethics'
                             , root: '/blog_pub'
                             , content: md(content ,'thomblake/blog')
                             } ))
}
