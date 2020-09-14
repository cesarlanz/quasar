'use strict'

const request = require('supertest')
const test = require('ava')

const server = require('../server')

// Get the coordinates of the ship and the encrypted message:
// ---------------------------------------------------------
// Given the distances of the ship and the messages received by each satellite
// When the system receives the data
// Then the system should show the coordinates of the ship and the decrypted message
test.cb('Get the location of the ship and the message it emits', (t) => {
  // Given the distances of the ship and the messages received by each satellite
  const data = {
    satellites: [
      {
        name: 'kenobi',
        distance: 100.0,
        message: ['este', '', '', 'mensaje', '']
      },
      {
        name: 'skywalker',
        distance: 115.5,
        message: ['', 'es', '', '', 'secreto']
      },
      {
        name: 'sato',
        distance: 142.7,
        message: ['este', '', 'un', '', '']
      }
    ]
  }
  // When the system receives the data
  request(server)
    .post('/topsecret')
    .send(data)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.falsy(err, 'should not error')
      // Then the system should show the coordinates of the ship and the decrypted message
      t.deepEqual(res.body, {
        position: {
          x: -487.28591250000005,
          y: 1557.0142250000004
        },
        message: 'este es un mensaje secreto'
      })
      t.end()
    })
})

// Validate input data:
// -------------------
// Given the distances of the ship and the messages received by each satellite
// When the user send his data to the system
// Then the system should return an error validation message
test.cb('Validate satelites data', (t) => {
  // Given the distances of the ship and the messages received by each satellite
  const data = {
    satellites: [
      {
        name: 'kenob',
        distance: 100.0,
        message: ['este', '', '', 'mensaje', '']
      },
      {
        name: 'skywalker',
        distance: 115.5,
        message: ['', 'es', '', '', 'secreto']
      },
      {
        name: 'sato',
        distance: 142.7,
        message: ['este', '', 'un', '', '']
      }
    ]
  }
  // When the user send his data to the system
  request(server)
    .post('/topsecret')
    .send(data)
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, res) => {
      t.falsy(err, 'should not error')
      // Then the system should return an error validation message
      t.deepEqual(res.body, {
        error: "Satellite 'kenob' not valid"
      })
      t.end()
    })
})
