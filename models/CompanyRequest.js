var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CompanyRequestSchema = new Schema({
	investor_id: {
		type: Schema.ObjectId,
		ref: 'user',
		required: true
	},
	assigned: {
		type: Boolean,
		default: false
	},
	lawyer_id: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	creation_date: {
		type: Date,
		default: Date.now
	}
})

module.exports = CompanyRequest = mongoose.model('company-request', CompanyRequestSchema)
