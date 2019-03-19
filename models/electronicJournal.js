// The electronic Journal Model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ElectronicJournalSchema = new Schema({
  companyName: {
    type: String,
    required: true
  },
  companyDescription: {
    type: String
  },
  companyAcceptanceDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = ElectronicJournal = mongoose.model('electronicJournals', ElectronicJournalSchema)
