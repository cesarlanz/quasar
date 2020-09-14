'use strict'

const trilateration = require('node-trilateration')
const { SATELLITES } = require('../constants')

class PositionLocator {
  // input: distancia al emisor tal cual se recibe en cada satélite
  // output: las coordenadas ‘x’ e ‘y’ del emisor del mensaje
  static getLocation (distances) {
    const beacons = SATELLITES.map((item, index) => ({
      x: item.location[0],
      y: item.location[1],
      distance: distances[index]
    }))
    return trilateration.calculate(beacons)
  }
}

module.exports = PositionLocator
