'use strict'

const { getLogger } = require('../utils')
const topsecret = require('./topsecret')
const topsecretSplit = require('./topsecret-split')

const log = getLogger(__dirname, __filename)

module.exports = {
  home (req, res) {
    res.send({
      topsecret: '/topsecret',
      topsecretSplit: '/topsecret-split'
    })
  },
  topsecret,
  topsecretSplit,
  errorHandler (err, req, res, next) {
    if (err) {
      const code = err.code || 500
      const { id } = req
      const { message, stack } = err
      log.debug({ id, message: stack })
      log.error({ id, message })
      res.status(code).send({ error: message })
      return
    }
    next()
  }
}
