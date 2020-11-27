import mongoose from 'mongoose'
const Schema = mongoose.Schema

const user = new Schema({
  _id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  since: {
    type: Date,
    default: Date.now
  }
})

mongoose.models = {}

const User = mongoose.model('User', user)

export default User
