const express = require('express')
const router = express.Router()
var commentController = require('../../controllers/commentController')

router.get('/', commentController.listAllComments)
router.get('/viewSpecific/:id', commentController.viewSpecific)
router.get('/:id', commentController.viewComments)

router.post('/', commentController.createComment)// new --create comment on a application form.
router.post('/:id', commentController.updateComment)// new --update a comment.

router.delete('/:comm_id', commentController.deleteComment)// new --delete comment.


module.exports = router

