const webpack = require('webpack')
const axios = require('axios')
const path = require('path')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')
const serverConfig = require('../../webpack.server.js')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:5000/public/index.html')
      .then((res) => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const Module = module.constructor
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs //eslint-disable-line
let serverBundle

serverCompiler.outputFileSystem = mfs

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err=> console.error(err)) //eslint-disable-line
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename,
  )

  const bundle = mfs.readFileSync(bundlePath, 'utf-8') // 读出来是string 不是模块
  const m = new Module()
  m._compile(bundle, 'server-bundle.js') //eslint-disable-line
  serverBundle = m.exports.default
})

module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:5000'
  }))
  app.get('*', (req, res) => {
    getTemplate().then(template => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(template.replace('<!--app-->',content))
    })
  })
}
