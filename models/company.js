var mongoose = require('mongoose')
var Schema = mongoose.Schema
var BoardMemberSchema = require('./BoardMember')
var companySchema = new Schema({
  // attributes  f description sumerge
  organizational_rule: {
    type: String,
    required: true,
    enum: ['organizational_rule1', 'organizational_rule2']
  },
  legal_form: {
    type: String,
    required: true,
    enum: ['legal_form1', 'legal_form2']
  },
  company_name_arabic: {
    type: String,
    required: true
  },
  company_name_english: {
    type: String
  },
  hq_governorate: {
    type: String,
    required: true,
    enum: ['hq_governorate1', 'hq_governorate2']
  },

  hq_city: {
    type: String,
    required: true,
    enum: ['hq_city1', 'hq_city2']
  },
  hq_address: {
    type: String,
    required: true
  },
  hq_telephone: {
    type: String
  },
  hq_fax: {
    type: String
  },
  capital_currency: {
    type: String,
    required: true,
    enum: ['EGP', 'Euro']
  },
  capital: {
    type: Number,
    required: true
  },
  investor_name: {
    type: String,
    required: true
  },
  investor_type: {
    type: String,
    enum: ['type1', 'type2']
  },
  investor_gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  nationality: {
    type: String,
    required: true,
    enum: ['Egyptian', 'German']
  },
  investor_id_type: {
    type: String,
    required: true,
    enum: ['id_type1', 'id_type2']
  },
  investor_id_number: {
    type: String,
    required: true
  },
  investor_birth_date: {
    type: Date,
    required: true
  },
  investor_address: {
    type: String,
    required: true
  },
  investor_telephone: {
    type: String
  },
  investor_fax: {
    type: String
  },
  investor_email: {
    type: String
  },
  board_members:
    {
      type: [BoardMemberSchema]
    },

  // attributes added
  company_type: {
    type: String,
    enum: ['ssc', 'spc']
  },
  assigned_status: {
    type: Boolean,
    default: false
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  reviewed_statuslawyer: {
    type: Boolean,
    default: false
  },
  reviewed_statusreviewer: {
    type: Boolean,
    default: false
  },
  review_reviewer: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  review_lawyer: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: Schema.ObjectId,
      ref: 'comment'
    }
  ],
  fees: {
    type: Number
  },
  ispaid: {
    type: Boolean,
    default: false
  },
  established: {
    type: Boolean,
    default: false
  }
})

var company = mongoose.model('company', companySchema)

module.exports = company
