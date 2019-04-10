// The electronic Journal Model
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ElectronicJournalSchema = new Schema({
  companyId: {
    type: Schema.ObjectId,
    ref: 'company'
  },
  companyName: {
    type: String,
    required: true,
    ref: 'company'
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
