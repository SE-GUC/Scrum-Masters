const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

router.use(express.json())

router.get('/', userController.listAllUsers)
router.get('/:id', userController.getUser)
router.get('/getfees/:id', userController.viewApplicationFees)
router.get('/getlawyer/:companyid', userController.getassignedlawyer)

router.post('/', userController.createUser)
router.post('/assignreviewer/:app_id/:rev_id', userController.assignReviewer)
 
router.post("/assignLawyer/:appId/:lawyerId", userController.assignLaywer)



router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
