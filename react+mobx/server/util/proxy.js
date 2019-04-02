const axios = require('axios')
const baseUrl = 'https://cnodejs.org/api/v1'
const queryString = require('query-string')

module.exports = (req, res, next) => {
  const path = req.path // eslint-disable-line
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken // eslint-disable-line

  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login',
    })
  }
  const query = queryString(Object.assign({}, req.query))
  if (query.needAccessToken) delete query.needAccessToken
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: Object.assign({}, req.body, { accessToken: user.accessToken }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
    .then((resp) => {
      if (resp.status === 200) {
        res.send(resp.data)
      } else {
        res.status(resp.status).send(resp.data)
      }
    })
    .catch((err) => {
      if (err.response) {
        res.status(500).send(err.response.data)
      } else {
        res.status(500).send({
          success: false,
          data: '未知错误',
        })
      }
    })
}
