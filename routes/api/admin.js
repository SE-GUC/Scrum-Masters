const Joi = require('joi')
const express = require('express')
const router = express.Router()
router.use(express.json())

// We will be connecting using database

const admin = require('../../models/admin')

const admin_data = [new admin(1, 'brz', 'brz@mail.com', 'vvvsss', 22, 'male', 'Egyptian')]

router.get('/', (req, res) => res.json({ data: admin_data }))

router.get('/:id', (req, res) => {
  // Find the admin with given id
  const Admin = admin_data.find(e => e.id === parseInt(req.params.id))
  // Send 404 error if not found
  if (!Admin) return res.status(404).send(`The Admin with this id was not found.`)
  res.send(Admin)
})

router.post('/', (req, res) => {
// Validate using destructring = result.error to simplify the code
  const { error } = validateadmin(req.body)
  // If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message)
  const admin = {
    id: admin_data.length + 1,
    name: req.body.name,
    email: req.body.name,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
    nationality: req.body.nationality
  }
  admin_data.push(admin)
  res.send(admin)
})

router.put('/:id', (req, res) => {
  // Lookup the course
  const Admin = admin_data.find(
    e => e.id === parseInt(req.params.id))
  // Send 404 error if not found
  if (!Admin) return res.status(404).send(`The Admin with this id was not found.`)
  // Validate using destructring = result.error, to simplify the code
  const { error } = validateadmin(req.body)
  // If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message)
  // Update course
  Admin.name = req.body.name
  Admin.email = req.body.email
  Admin.password = req.body.password
  Admin.age = req.body.age
  Admin.gender = req.body.gender
  Admin.nationality = req.body.nationality
  // Return the updated course
  res.send(Admin)
})

router.delete('/:id', (req, res) => {
  // Lookup the Admin
  const Admin = admin_data.find(
    e => e.id === parseInt(req.params.id)
  )
  // Send 404 error if not found
  if (!Admin) return res.status(404).send(`The Admin with this id was not found.`)
  // Delete
  const index = admin_data.indexOf(Admin)
  admin_data.splice(index, 1)
  // Return the same course by convention
  res.send(Admin)
})

// A function that takes admin and validates it against the schema

function validateadmin (admin) {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    nationality: Joi.string().required()
  }
  return Joi.validate(admin, schema)
}

module.exports = router
