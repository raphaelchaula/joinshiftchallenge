import mongoose from 'mongoose'
const Schema = mongoose.Schema

const question = new Schema({
  _id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  dimension: {
    type: String,
    required: true,
    enum: ['EI', 'SN', 'TF', 'JP']
  },
  direction: {
    type: Number,
    required: true,
    enum: [1, -1]
  },
  meaning: {
    type: String,
    required: true,
    enum: ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P']
  }
})

mongoose.models = {}

const Question = mongoose.model('Question', question)

export default Question
