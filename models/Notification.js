const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
  owner_id: {
    type: Schema.ObjectId,
    ref: 'user',
    required: true
  },
  target_type: {
    type: String,
    enum: ['company'],
    required: true
  },
  target_id: {
    type: Schema.ObjectId,
    required: true
  },
  notif_text: {
    type: String,
    required: true
  },
  viewed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Notification = mongoose.model('notification', NotificationSchema)
