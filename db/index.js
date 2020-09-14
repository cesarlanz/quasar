'use strict'

const mongoose = require('mongoose')
const config = require('../config')
const { getLogger, terminate } = require('../utils')

const Transmission = require('./models/transmission')

const log = getLogger(__dirname, __filename)

if (!config.db) {
  log.error('please set MONGODB_URL env variable')
  process.exit(1)
}

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', terminate(1, 'dbError'))
mongoose.connection.once('open', () => {
  log.info('db connected')
})

module.exports = {
  Transmission
}
