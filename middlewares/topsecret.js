'use strict'

const { SATELLITES } = require('../constants')
const { BadRequest } = require('../errors')
const {
  validateArray,
  validateSatellite,
  validateDistance,
  validateMessage
} = require('../validations')

function validateData (req, res, next) {
  const { body } = req
  const { satellites } = body
  let maxmsglen = -1
  if (!satellites || !validateArray(satellites) || (satellites.length !== SATELLITES.length)) {
    next(new BadRequest(`should be ${SATELLITES.length} satellites`))
    return
  }
  for (const i of satellites) {
    const { name, distance, message } = i
    if (!validateSatellite(name)) {
      next(new BadRequest(`Satellite '${name}' not valid`))
      return
    }
    if (!validateDistance(distance)) {
      next(new BadRequest(`Distance '${distance}' not valid`))
      return
    }
    if (!validateMessage(message)) {
      next(new BadRequest(`Message '${message.join(' ')}' not valid`))
      return
    }
    if ((maxmsglen > -1) && (maxmsglen !== message.length)) {
      next(new BadRequest('All messages must be the same length'))
      return
    }
    maxmsglen = message.length
  }
  next()
}

module.exports = {
  validateData
}
