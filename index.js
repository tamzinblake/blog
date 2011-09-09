var routes = { index       : require('./lib/index')
             , error       : require('./lib/error')
             , js          : require('./lib/sendfile')
             }

function reroute (req, res) {
  var path = split_params(req.params[0])
    , route = routes[path[1]]

  if (route == undefined) {
    route = routes['error']
  }

  route(req,res,path)
}

function split_params (params) {
  if (params == undefined) {
    return ['','index']
  }
  else {
    return params.split(/\//)
  }
}

module.exports = reroute
