module.exports = reroute

var error = require('./error')
  , siteConfig = require('./siteConfig')
  , routes = { js  : 'js/'
             , css : 'css/'
             , images : 'images'
             }

function reroute (req, res, path) {
  var route = routes[path[1]]
    , filename

  if (path[2] != undefined) {
    filename = path[2].match(/^\w+\.\w+/)
  }

  if (route == undefined || filename == null) {
    error(req,res,path)
  }
  else {
    res.sendfile(siteConfig.htdocsRoot + '/' + route + filename.input)
  }
}
