import mongoose from 'mongoose'
const Schema = mongoose.Schema

const answer = new Schema({
  _id: {
    type: String,
    required: true
  },
  user: {
    type: Number,
    ref: 'User',
    required: true
  },
  answers: {
    type: Object,
    required: true
  },
  result: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.models = {}

const Answer = mongoose.model('Answer', answer)

export default Answer
