const express = require('express')
const router = express.Router()
const companyController = require('../../controllers/company-controller')
const auth = require('../../middleware/auth.js')
const passport = require('passport')

router.use(express.json())


router.get('/', passport.authenticate('jwt', {session: false}), auth.isEntityEmployee, companyController.listAllCompanies)
router.get('/listUnassignedApplications', passport.authenticate('jwt', {session: false}), auth.isEntityEmployee, companyController.listUnassignedApplications)
router.get('/paidCompanies', passport.authenticate('jwt', {session: false}), auth.isEntityEmployee, companyController.listAllPaidCompanies)
router.get('/unreviewedCompanies', passport.authenticate('jwt', {session: false}), auth.isEntityEmployee, companyController.listAllUnreviewedCompanies)
router.get('/userCreatedApplications/:id', passport.authenticate('jwt', {session: false}), auth.canListUserCompanies, companyController.listUserCreatedApplications)
router.get('/lawyerAssignedApplications/:id', passport.authenticate('jwt', {session: false}), auth.isEntityEmployee, companyController.listLawyerAssignedApplications)
router.get('/reviewerAssignedApplications/:id', passport.authenticate('jwt', {session: false}), auth.isEntityEmployee, companyController.listReviewerAssignedApplications)
router.get('/:id', passport.authenticate('jwt', {session: false}), auth.canAccessApplication, companyController.getCompany)

router.post('/', passport.authenticate('jwt', {session: false}), auth.canCreateApplication, companyController.createCompany)
//router.post('/establish/:id', companyController.establishCompany)

router.put('/:id', passport.authenticate('jwt', {session: false}), auth.canUpdateApplication, companyController.updateCompany)
router.put('/calculatefees/:id', passport.authenticate('jwt', {session: false}), auth.canAccessApplication, companyController.calculateCompanyFees)

router.delete('/:id', passport.authenticate('jwt', {session: false}), auth.canUpdateApplication, companyController.deleteCompany)



module.exports = router

