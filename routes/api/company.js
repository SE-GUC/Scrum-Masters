const express = require('express')
const router = express.Router()
const companyController = require('../../controllers/company-controller')

router.use(express.json())


router.get('/', companyController.listAllCompanies)
router.get('/listUnassignedApplications', companyController.listUnassignedApplications)
router.get('/paidCompanies', companyController.listAllPaidCompanies)
router.get('/unreviewedCompanies', companyController.listAllUnreviewedCompanies)
router.get('/userCreatedApplications/:id', companyController.listUserCreatedApplications)
router.get('/lawyerAssignedApplications/:id', companyController.listLawyerAssignedApplications)
router.get('/reviewerAssignedApplications/:id', companyController.listReviewerAssignedApplications)
router.get('/:id', companyController.getCompany)

router.post('/', companyController.createCompany)
router.post('/establish/:id', companyController.establishCompany)

router.put('/:id', companyController.updateCompany)
router.put('/calculatefees/:id', companyController.calculateCompanyFees)

router.delete('/:id', companyController.deleteCompany)



module.exports = router

