const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

router.use(express.json())

router.get('/', userController.listAllUsers)
router.get('/:id', userController.getUser)

router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
