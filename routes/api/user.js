const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')
const auth = require('../../middleware/auth.js')
const passport = require('passport')

router.use(express.json())

router.get('/', passport.authenticate('jwt', {session: false}), userController.listAllUsers)
router.get('/:id', passport.authenticate('jwt', {session: false}), auth.canViewUser, userController.getUser)
router.get('/name/:id', passport.authenticate('jwt', {session: false}), userController.getName)
router.get('/getfees/:id', passport.authenticate('jwt', {session: false}), auth.canAccessApplication, userController.viewApplicationFees)
router.get('/getlawyer/:companyid', passport.authenticate('jwt', {session: false}), auth.canAccessApplication, userController.getassignedlawyer)

router.post('/', passport.authenticate('jwt', {session: false}), auth.isAdmin, userController.createUser)
router.post('/assignreviewer/:appId/:revId', passport.authenticate('jwt', {session: false}), auth.canAssignReviewer, userController.assignReviewer)
router.post('/assignLawyer/:appId/:lawyerId', passport.authenticate('jwt', {session: false}), auth.canAssignLawyer, userController.assignLaywer)


router.put('/lawyerReviewCompany/:appId/:userId', passport.authenticate('jwt', {session: false}), auth.canUnassignLawyer, userController.lawyerReviewCompany)
router.put('/reviewerReviewCompany/:appId/:userId', passport.authenticate('jwt', {session: false}), auth.canUnassignReviewer, userController.reviewerReviewCompany)

router.post('/login', userController.login)
router.post('/register', auth.canRegister, userController.register)


router.put('/unassignLawyer/:appId', passport.authenticate('jwt', {session: false}), auth.canUnassignLawyer, userController.unassignLaywer)
router.put('/unassignReviewer/:appId', passport.authenticate('jwt', {session: false}), auth.canUnassignReviewer, userController.unassignReviewer)

router.put('/:id', passport.authenticate('jwt', {session: false}), auth.canViewUser, userController.updateUser)

router.delete('/:id', passport.authenticate('jwt', {session: false}), auth.canViewUser, userController.deleteUser)

module.exports = router
