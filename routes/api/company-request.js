const express = require('express')
const router = express.Router()
const companyRequestController = require('../../controllers/company-request-controller')

router.use(express.json())

router.get('/', companyRequestController.getAllCompanyRequests)
router.get('/:id', companyRequestController.getUserCompanyRequests)
router.post('/', companyRequestController.createCompanyRequest)
router.post('/assign/:id', companyRequestController.assignLawyer)
router.delete('/:id', companyRequestController.deleteCompanyRequest)

module.exports = router
