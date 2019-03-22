
const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

router.use(express.json())

router.get('/:id', userController.getNotifications)
router.delete('/:id', userController.setNotificationViewed)
router.post('/', userController.notificationTestCreate) // for testing only

//router.post('/', notificationcontroller.createnotification)
//router.put('/:id', notificationcontroller.updatenotification)
//router.delete('/:id', notificationcontroller.deletenotification)

module.exports = router