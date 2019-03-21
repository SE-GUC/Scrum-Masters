const Joi = require('joi')
const User = require('../models/user')

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
