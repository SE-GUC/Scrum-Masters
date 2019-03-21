
const express = require('express')
const router = express.Router()
const notificationcontroller = require('../../controllers/notification-controller')

router.use(express.json())

router.get('/', notificationcontroller.getallnotifications)
router.get('/:id', notificationcontroller.getnotification)

router.post('/', notificationcontroller.createnotification)
router.put('/:id', notificationcontroller.updatenotification)
router.delete('/:id', notificationcontroller.deletenotification)

module.exports = router