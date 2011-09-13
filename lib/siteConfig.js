var path = require('path')
  , siteRoot = path.resolve(__dirname, '..')
  , templateRoot = path.resolve(siteRoot, 'templates')
  , htdocsRoot = path.resolve(siteRoot, 'htdocs')

module.exports =
  { siteRoot: siteRoot
  , templateRoot: templateRoot
  , htdocsRoot: htdocsRoot
  }
