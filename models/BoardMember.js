const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BoardMemberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['type1', 'type2'],
    required: true
  },
  nationality: {
    type: String,
    enum: ['Egyptian', 'German'],
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    require: true
  },
  id_type: {
    type: String,
    enum: ['type1', 'type2'],
    require: true
  },
  id_number: {
    type: String,
    require: true
  },
  birth_date: {
    type: Date,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  position: {
    type: String,
    enum: ['Manager', 'Employee'],
    required: true
  }
})

module.exports = BoardMemberSchema
