const express = require('express')
const router = express.Router()
const paymentController = require('../../controllers/payment-controller')

router.use(express.json())

router.post('/charge/:id', paymentController.charge)

module.exports = router
