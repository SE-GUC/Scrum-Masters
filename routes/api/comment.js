const express = require('express')
const router = express.Router()

const comment = require('../../models/comment')

const Comment = [
  new comment('noone', 1, 11),
  new comment('no', 2, 12),
  new comment('nqqdqw', 3, 13),
  new comment('nqde', 4, 14),
  new comment('dqd', 5, 15)
]

// create new comment(DONE)
router.post('/', (req, res) => {
  const Comment_text = req.body.comment_text
  const User_id = req.body.user_id
  const application_ID = req.body.application_id

  if (!Comment_text) { return res.status(400).send({ err: 'Comment field is required' }) }
  if (typeof Comment_text !== 'string') { return res.status(400).send({ err: 'Invalid value for comment text' }) }
  if (!User_id) { return res.status(400).send({ err: 'The user id is missing' }) }
  if (typeof User_id !== 'number') { return res.status(400).send({ err: 'Invalid value for User Id' }) }
  if (!application_ID) { return res.status(400).send({ err: 'Application id is required' }) }
  if (typeof application_ID !== 'number') { return res.status(400).send({ err: 'Invalid value for Application id' }) }

  const newcomment = new comment(Comment_text, User_id, application_ID)
  Comment.push(newcomment)

  return res.json({ data: newcomment })
})
// retrive this applicaton comment(DONE)
router.get('/:user_id/:application_id', (req, res) => {
  const u_id = req.params.user_id
  const ap_id = req.params.application_id

  var commentfs = Comment.find(
    c =>
      c.user_id == parseInt(u_id) &&
      c.application_id == parseInt(ap_id)
  )

  if (!commentfs) {
    return res.status(400).send({ err: 'This Application Still Does Not Have Comment' })
  } else {
    return res.json({ data: commentfs })
  }
})
// update Comment(DONE)
router.put('/:comment_id', (req, res) => {
  const updatedcommenttext = req.body.comment_text
  if (!updatedcommenttext) {
    return res.status(400).send({ err: 'Comment field is required' })
  } else if (typeof updatedcommenttext !== 'string') {
    return res.status(400).send({ err: 'Invalid Comment ' })
  } else {
    const commentfs = Comment.find(
      c => c.comment_id == req.params.comment_id
    )
    if (!commentfs) {
      return res.status(400).send({ err: 'This Comment Is Not Available' })
    } else {
      commentfs.comment_text = updatedcommenttext
      return res.json({ data: commentfs })
    }
  }
})
// Delete Comment(Done)
router.delete('/:comment_id', (req, res) => {
  const commentds = Comment.find(
    c => c.comment_id == req.params.comment_id
  )
  const index = Comment.indexOf(commentds)
  Comment.splice(index, 1)
  return res.json({ data: Comment })
})

module.exports = router
