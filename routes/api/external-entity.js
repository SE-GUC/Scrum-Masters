const express = require('express')
const router = express.Router()
const companyController = require('../../controllers/company-controller')

router.use(express.json())

router.get('/', companyController.listAllEstablished)

module.exports = router
