const express = require('express')
const router = express.Router()
const companyController = require('../../controllers/company-controller')

router.use(express.json())


router.get('/', companyController.listAllCompanies)
router.get("/listUnassignedApplications",companyController.listUnassignedApplications);
router.get('/paidCompanies', companyController.listAllPaidCompanies)
router.get('/unreviewedCompanies', companyController.listAllUnreviewedCompanies)
router.get('/:id', companyController.getCompany)

router.post('/', companyController.createCompany)
router.put('/:id', companyController.updateCompany)
router.put('/addfees/:id', companyController.addFees)
router.delete('/:id', companyController.deleteCompany)

router.post('/establish/:id', companyController.establishCompany)

module.exports = router

