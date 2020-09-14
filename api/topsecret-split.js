'use strict'

const { Router } = require('express')
const { Transmission } = require('../db')
const { NotFound } = require('../errors')
const { validateData } = require('../middlewares/topsecret-split')
const { MessageDecryptor, PositionLocator } = require('../classes')
const { SATELLITES } = require('../constants')

const router = new Router()

router.post('/:satellite', validateData, async function postTopSecretSplit (req, res, next) {
  try {
    const { params, body, connection } = req
    const { satellite } = params
    const { distance, message } = body
    const { remoteAddress: ip } = connection

    let transmission = await Transmission.find({ ip, satellite, distance, message })
    if (transmission.length) {
      return res.send({
        status: 'Duplicate transmission.'
      })
    }

    transmission = await Transmission.find({ ip, satellite })
    if (transmission.length) {
      await Transmission.findOneAndUpdate({ ip, satellite }, { distance, message })
      return res.send({
        status: 'Updated transmission.'
      })
    }

    await new Transmission({ ip, satellite, distance, message }).save()
    res.send({
      status: 'Saved transmission.'
    })
  } catch (err) {
    next(err)
  }
})

router.get('/', async function getTopSecretSplit (req, res, next) {
  try {
    const { connection } = req
    const { remoteAddress: ip } = connection

    const transmissions = await Transmission.find({ ip })
    if (transmissions.length < SATELLITES.length) {
      next(new NotFound('Not enough information.'))
      return
    }

    const distances = transmissions.map(item => item.distance)
    const messages = transmissions.map(item => item.message)

    await Transmission.remove({ ip });

    res.send({
      position: PositionLocator.getLocation(distances),
      message: MessageDecryptor.getMessage(messages)
    })    
  } catch (err) {
    next(err)
  }
})

module.exports = router
