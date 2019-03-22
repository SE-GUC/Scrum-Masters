const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  type: {
    type: String,
    enum: ['investor', 'lawyer', 'reviewer', 'admin'],
    required: true
  },
  companies: [{
    type: Schema.ObjectId,
    ref: 'company'
  }],
  notifications: [{
    type: Schema.ObjectId,
    ref: 'notification'
  }]

  // add more attributes as needed later

})

module.exports = User = mongoose.model('user', UserSchema)
