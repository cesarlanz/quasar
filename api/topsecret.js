'use strict'

const { Router } = require('express')
const { NotFound } = require('../errors')
const { validateData } = require('../middlewares/topsecret')
const { MessageDecryptor, PositionLocator } = require('../classes')

const router = new Router()

router.post('/', validateData, async function postTopSecret (req, res, next) {
  try {
    const { body } = req
    const { satellites } = body

    const distances = satellites.map(item => item.distance)
    const messages = satellites.map(item => item.message)

    const message = MessageDecryptor.getMessage(messages)
    if (!message) {
      next(new NotFound('Not enough information.'))
      return
    }

    res.send({
      position: PositionLocator.getLocation(distances),
      message
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
