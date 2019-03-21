const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Notificationschema = new Schema({
	owner_id: {
		type: String,
		required: true,
	},
	object_type: {
		type: String,
		required: true,
	},
	object_id: {
		type: String,
		required: true,
	},
	notif_text: {
		type: String,
		required: true,
	},
	viewed: {
		type: String,
		enum:['false','true'],
		default: 'false',
		required: true,
	},
	date:{
		type:Date,
		required:true,
	}	
})

module.exports = Notification= mongoose.model('notifications', Notificationschema)
