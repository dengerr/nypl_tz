var webpack = require('webpack')
var http = require('http')
var url = require('url')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

require('babel-core/register');
['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

var nyplCb = function (res) {
  return function (nyplRes) {
    res.setHeader('content-type', nyplRes.headers['content-type'])
    nyplRes.on('data', function (chunk) {
      res.write(chunk)
    })
    nyplRes.on('end', function () {
      res.end()
    })
  }
}

app.get("/nypl/search.json", function (req, res) {
  var urlParsed = url.parse(req.url, true)
  http.get({
    'host': 'api.repo.nypl.org',
    'path': '/api/v1/items/search?q=' + urlParsed.query.q +  '&publicDomainOnly=true',
    'headers': {
      'Authorization': 'Token token="qqcvhrm19752modk"'
    }
  }, nyplCb(res))
})

app.get("/nypl/details.json", function (req, res) {
  var urlParsed = url.parse(req.url, true)
  var path
  if (urlParsed.query.apiItemDetailURL) {
    path = urlParsed.query.apiItemDetailURL.slice(urlParsed.query.apiItemDetailURL.indexOf('/api/'))
  } else {
    path = '/api/v1/items/' + urlParsed.query.uuid
  }
  http.get({
    'host': 'api.repo.nypl.org',
    'path': path,
    'headers': {
      'Authorization': 'Token token="qqcvhrm19752modk"'
    }
  }, nyplCb(res))
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

