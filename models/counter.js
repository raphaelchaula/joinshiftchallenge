const mongoose = require('mongoose')
const Schema = mongoose.Schema

const counter = new Schema({
  _id: {
    type: String,
    required: true
  },
  sequence: {
    type: Number,
    default: 0
  }
})

const Counter = mongoose.model('Counter', counter)

module.exports = Counter
