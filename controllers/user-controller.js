const Joi = require('joi')
const User = require('../models/user')
var Company = require("../models/company")
var Comment = require("../models/comment")


function validatecommnet (comment){
  const schema={
     comment_text : Joi.string().required(),
     application_id : Joi.string().required(),
     user_id :Joi.string().required()

}
return Joi.validate(comment,schema)

}

function validateUser (user, creating) {
  const schema = {
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    password: Joi.string().min(8).max(30).required(),
    gender: Joi.string().valid(['male', 'female']).required()
  }
  if (creating) {
    Object.assign(schema, {
      email: Joi.string().email().required(),
      type: Joi.string().valid(['investor', 'lawyer', 'reviewer', 'admin']).required()
    })
  }

  return Joi.validate(user, schema)
}

exports.listAllUsers = (req, res) => {
  User.find({}, { _id: true })
    .then(users => {
      return res.json({ data: users })
    }).catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).send('User not found')
      return res.json(user)
    }).catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.createUser = (req, res) => {
  const { error } = validateUser(req.body, true)
  if (error) return res.status(400).send(error.details[0].message)

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) return res.status(400).send('A user is already registered with this email')

      var user = req.body
      User.create(user)
        .then(user => {
          return res.json({ msg: "User created", data: user })
        }).catch(err => {
          console.log(err)
          return res.sendStatus(500)
        })
    }).catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.updateUser = (req, res) => {
  const { error } = validateUser(req.body, false)
  if (error) return res.status(400).send(error.details[0].message)

  User.findByIdAndUpdate(req.params.id, req.body, { new: false })
    .then(user => {
      if (!user) return res.status(404).send('User not found')
      return res.json({ msg: "User updated", data: user })
    }).catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) return res.status(404).send('User not found')
      return res.json({ msg: "User deleted", data: user })
    }).catch(err => {
      console.log(err)
      return res.sendStatus(500)
    })
}
//add comment on a specific company application 

exports.createComment=(req,res)=>{

   let {
   comment_text,
   application_id,
   user_id
   }=req.body
   if(!(comment_text && application_id && user_id))return res.sendStatus(400)
   const { error } = validatecommnet(req.body)
   if (error) return res.status(400).send(error.details[0].message)

   let comment={}
   comment.comment_date=new Date()
   comment.comment_text=comment_text
   comment.application_id= application_id
   comment.user_id=user_id
   
   Comment.create(comment)
   .then(comment =>{
      Company.findOneAndUpdate({_id:application_id},
          {$push:{comments:comment._id}}
          )
          .then(()=>{
              return res.json({comment:comment})
          })
          .catch(err =>{
              console.log("Internal server error while adding comment to company list: \n",err,"\n\n")
              return res.sendStatus(500);
           })
  
      })
      .catch(err =>{
          console.log("Internal server error while creating commnet: \n",err,"\n\n")
          return res.sendStatus(500);
      })
  
  
}
  
  
  exports.updateComment=async(req,res)=>{
  const comment_id=req.params.id
  const comment_text = req.body.comment_text
  if(!comment_text) return res.send({error:'comment text is required'})
  if (typeof comment_text !== 'string') { return res.status(400).send({ err: 'Invalid value for comment text' }) }
  const comment= await Comment.findByIdAndUpdate(comment_id,{comment_text:comment_text},{new:true})
  
  if(!comment) return res.status(400).send({error:'comment not found'})
  
  return res.status(200).send(comment)
  
  }
  
  exports.deleteComment= async (req,res)=>{
  const application_id=req.params.app_id
  const comment_id = req.params.comm_id
  const deletedcomment = await Comment.findByIdAndRemove(comment_id) 
  if(!deletedcomment) return res.status(404).send({error:'comment not found '})
 
  
  const targetapplication = await Company.findById(application_id)
  if(!targetapplication) return res.status(404).send({error:'application not found '})
  var deletedComment = targetapplication.comments.remove(comment_id)
  return res.send(deletedComment)
  
  
  
  
  }
  
  exports.viewComments=  async(req,res)=>{
   const application_id=req.params.id
    const targetapplication= await Company.findById(application_id).populate({
      path: "comments",
      model: "comment",
    })
    if(!targetapplication) return res.status(404).send({error:'application not found'})
    
   return res.json(targetapplication.comments)
  }
