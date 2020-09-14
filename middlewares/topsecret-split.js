'use strict'

const { BadRequest } = require('../errors')
const {
  validateSatellite,
  validateDistance,
  validateMessage
} = require('../validations')

function validateData (req, res, next) {
  const { params, body } = req
  const { satellite } = params
  const { distance, message } = body
  if (!validateSatellite(satellite)) {
    next(new BadRequest(`satellite '${satellite}' not valid`))
    return
  }
  if (!validateDistance(distance)) {
    next(new BadRequest(`distance '${distance}' not valid`))
    return
  }
  if (!validateMessage(message)) {
    next(new BadRequest(`message '${message.join(' ')}' not valid`))
    return
  }
  next()
}

module.exports = {
  validateData
}
