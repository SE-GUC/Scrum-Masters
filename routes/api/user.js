const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')
const passport = require('passport')


router.use(express.json())

router.get('/',passport.authenticate('jwt', {session: false}),userController.listAllUsers)//test
router.get('/:id',userController.getUser)
router.get('/getfees/:id', userController.viewApplicationFees)
router.get('/getlawyer/:companyid', userController.getassignedlawyer)

router.post('/', userController.createUser)
router.post('/assignreviewer/:app_id/:rev_id', userController.assignReviewer)
router.post('/assignLawyer/:appId/:lawyerId', userController.assignLaywer)


router.put('/lawyerReviewCompany/:appId/:userId',userController.lawyerReviewCompany)
router.put('/reviewerReviewCompany/:appId/:userId',userController.reviewerReviewCompany)

router.post('/login',userController.login)
router.post('/register',userController.register)


router.put('/unassignLawyer/:appId', userController.unassignLaywer)
router.put('/unassignReviewer/:appId', userController.unassignReviewer)

router.put('/:id', userController.updateUser)
router.put('/publishpaidcompany/:appId/:adminId', userController.publishPaidApplication)

router.delete('/:id', userController.deleteUser)

module.exports = router
