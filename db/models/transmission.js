'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
  ip: {
    type: String,
    required: true
  },
  satellite: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  message: {
    type: Array,
    required: true
  }
})

if (!schema.options.toObject) {
  schema.options.toObject = {}
}

schema.options.toObject.transform = (doc, ret, options) => {
  // delete version
  delete ret.__v
  return ret
}

module.exports = mongoose.model('transmission', schema)
