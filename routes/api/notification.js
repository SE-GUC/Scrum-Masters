const Joi = require('joi')
const express = require('express')
const router = express.Router()
const uuid = require('uuid')

router.use(express.json())

const Notification = require('../../models/Notification')

const notifications = [
  new Notification('owner_id', 'company', 'company_id', 'A new company has been created')
]

router.get('/:id', (req, res) => {
  const user_notifs = notifications.filter(s => s.owner_id === req.params.id)
  res.send(user_notifs)
})

router.post('/', (req, res) => {
  const { error } = validateNotification(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  notification = new Notification(req.body.owner_id, req.body.object_type, req.body.object_id, req.body.notif_text)

  notifications.push(notification)
  res.send(notification)
})

router.delete('/:id', (req, res) => {
  const notification = notifications.find(s => s.id === req.params.id)
  if (!notification) { return res.status(404).send(`There is no notification with such id`) }

  notification.viewed = true

  res.send(notification)
})

function validateNotification (notification) {
  var schema = {
    owner_id: Joi.string().required(),
    object_type: Joi.string().required(),
    object_id: Joi.string().required(),
    notif_text: Joi.string().required()
  }

  return Joi.validate(notification, schema)
}

module.exports = router
