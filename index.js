var routes = { index       : require('./lib/index')
             , error       : require('./lib/error')
             , js          : require('./lib/sendfile')
             , css         : require('./lib/sendfile')
             , images      : require('./lib/sendfile')
             }

function reroute (req, res) {
  var path = split_params(req.params[0])
    , route = routes[path[1]]

  if (route == undefined) {
    route = routes['index']
    path[2] = path[1]
  }

  route(req,res,path)
}

function split_params (params) {
  if (params == undefined || params == '/') {
    return ['','index']
  }
  else {
    return params.split(/\//)
  }
}

module.exports = reroute
