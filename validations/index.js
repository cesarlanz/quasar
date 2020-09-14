'use strict'

const { SATELLITES } = require('../constants')

function validateString (value) {
  return typeof value === 'string' || value instanceof String
}

function validateArray (value) {
  return value && typeof value === 'object' && value.constructor === Array
}

function validateSatellite (value) {
  return validateString && SATELLITES.find(i => i.name === value.toLowerCase())
}

function validateDistance (value) {
  return (typeof value === 'number') && isFinite(value) && (value > 0)
}

function validateMessage (value) {
  return validateArray(value) && (value.length > 0) && value.every(i => validateString(i))
}

module.exports = {
  validateString,
  validateArray,
  validateSatellite,
  validateDistance,
  validateMessage
}
