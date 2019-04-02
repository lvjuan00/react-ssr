const express = require('express')
const path = require('path')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class',
}))// 目的是之后可以写session 来存值

const isDev = process.env.NODE_ENV === 'development'

if (!isDev) {
  /* eslint-disable */
  const AppServer = require(path.join(__dirname,'../dist/server-bundle.js')).default// 把导出的App.jsx拿过来
  const TemplateHtml = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*',function(req,res){
    const contentString = ReactSSR.renderToString(AppServer)
    res.send(TemplateHtml.replace('<!--app-->',contentString))
  })
  /* eslint-enable */
} else {
  const devStatic = require('./util/dev-static.js')
  devStatic(app)
}

app.listen(1234, () => {
  console.log('server working in port 1234')
})
