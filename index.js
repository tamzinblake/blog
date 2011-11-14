/* global require module */
var routes = { posts : require('./lib/posts')
             , error : require('./lib/error')
             }

var _index = require('./lib/index')

function index (req ,res) {
  var path = split_params(req.params[0])
  _index(req ,res ,path)
}

function reroute (req ,res) {
  var path = split_params(req.params[0])
    , route = routes[path[1]]

  if (route == undefined) {
    route = routes['posts']
    path[2] = path[1]
  }

  route(req ,res ,path)
}

function split_params (params) {
  if (params == undefined || params == '/') {
    return ['' ,'index']
  }
  else {
    return params.split(/\//)
  }
}

module.exports = { reroute: reroute
                 , index: index
                 }
