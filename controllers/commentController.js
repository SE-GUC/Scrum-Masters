const Joi = require('joi') 
const User = require('../models/User') 
var Company = require('../models/company') 
var Comment = require('../models/comment') 
var Notification = require('../models/Notification') 

exports.listAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
    res.json({ data: comments })
  } catch (error) {
    console.log(error)
  }
}

// add comment on a specific company application
exports.createComment = (req, res) => {
  const { error } = validatecommnet(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  let { comment_text, application_id, user_id } = req.body

  let comment = {} 
  comment.comment_date = new Date()
  comment.comment_text = comment_text 
  comment.application_id = application_id 
  comment.user_id = user_id 

  Comment.create(comment)
    .then(comment => {
      Company.findOneAndUpdate(
        { _id: application_id },
        { $push: { comments: comment._id } }
      )
        .then(company => {
          notification = {} 
          notification.owner_id = company.owner
          notification.target_type = 'company' 
          notification.target_id = application_id 
          notification.notif_text = 'You have a pending comment on your application'
          Notification.create(notification)
            .then(notification => {
              User.findOneAndUpdate(
                { _id: company.owner },
                { $push: { notifications: notification._id } }
              )
                .then(() => {
                  return res.json({ comment: comment })
                })
                .catch(err => {
                  console.log(
                    'Internal server error while adding comment to company list: \n',
                    err,
                    '\n\n'
                  ) 
                  return res.sendStatus(500) 
                })
            })
            .catch(err => {
              console.log(
                'Internal server error while creating comment: \n',
                err,
                '\n\n'
              ) 
              return res.sendStatus(500) 
            })
        })
        .catch(err => {
          console.log(
            'Internal server error while adding comment to company list: \n',
            err,
            '\n\n'
          ) 
          return res.sendStatus(500) 
        }) 
    })
    .catch(err => {
      console.log(
        'Internal server error while creating commnet: \n',
        err,
        '\n\n'
      ) 
      return res.sendStatus(500) 
    })
}

exports.updateComment = async (req, res) => {
  const comment_id = req.params.id 
  const comment_text = req.body.comment_text 
  if (!comment_text) return res.send({ error: 'comment text is required' }) 
  if (typeof comment_text !== 'string') {
    return res.status(400).send({ err: 'Invalid value for comment text' }) 
  }
  const comment = await Comment.findByIdAndUpdate(
    comment_id,
    { comment_text: comment_text },
    { new: true }
  ) 

  if (!comment) return res.status(404).send({ error: 'comment not found' }) 

  return res.status(200).send(comment) 
} 
exports.viewSpecific = async(req,res)=>{
  const comment_id = req.params.id
  const comment = await  Comment.findById(comment_id)
  if (!comment) return res.status(404).send({ error: 'comment not found' })
  return res.send(comment)
}

exports.deleteComment = async (req, res) => {
  // const application_id = req.params.app_id 
  const comment_id = req.params.comm_id 
  const deletedcomment = await Comment.findByIdAndRemove(comment_id) 
  if (!deletedcomment) {
    return res.status(404).send({ error: 'comment not found ' })
  }

  const targetapplication = await Company.findById(deletedcomment.application_id)
  if (!targetapplication) {
    return res.status(404).send({ error: 'application not found ' })
  }
  const index = targetapplication.comments.indexOf(comment_id)
  var deletedComment = targetapplication.comments.splice(index, 1)
  // await Company.findByIdAndUpdate(deletedcomment.application_id)
  await Company.findByIdAndUpdate(deletedcomment.application_id, { $pull: { comments: deletedComment[0] } })
  return res.send(deletedComment) 
}

exports.viewComments = async (req, res) => {
  const application_id = req.params.id 
  const targetapplication = await Company.findById(application_id).populate({
    path: 'comments',
    model: 'comment'
  })
  if (!targetapplication) {
    return res.status(404).send({ error: 'application not found' })
  }

  return res.json(targetapplication.comments)
}

function validatecommnet (comment) {
  const schema = {
    comment_text: Joi.string().required(),
    application_id: Joi.string().required(),
    user_id: Joi.string().required()
  }
  return Joi.validate(comment, schema) 
}