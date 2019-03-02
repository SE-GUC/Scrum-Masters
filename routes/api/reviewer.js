const Joi = require('joi')
const express = require('express')
const router = express.Router()

router.use(express.json())

// We will be connecting using database
const Reviewer = require('../../models/reviewer')

const reviewers = [new Reviewer(1, 'Mortada', 'dada@mansour.com', 12345678, 7000500, null),
  new Reviewer(2, 'Mortaaa', 'dadaaa@mansour.com', 12245678, 70450500, null)]

router.get('/', (req, res) => res.json({ data: reviewers }))

router.get('/:id', (req, res) => {
  // Find the reviewer with given id
  const reviewer = reviewers.find(
    e => e.id === parseInt(req.params.id)
  )
  // Send 404 error if not found
  if (!reviewer) return res.status(404).send(`The reviewer with this ID was not found.`)
  res.send(reviewer)
})

router.post('/', (req, res) => {
  // Validate using destructring = result.error to simplify the code
  const { error } = validateReviewer(req.body)

  // If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message)

  // Create the reviewer, add to the array and display it.
  const reviewer = {
    id: reviewers.length + 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    telephone: req.body.telephone
  }
  reviewers.push(reviewer)
  res.send(reviewer)
})

router.put('/:id', (req, res) => {
  // Lookup the reviewer

  const reviewer = reviewers.find(
    e => e.id === parseInt(req.params.id)
  )
  // If not existing, return 404
  if (!reviewer) return res.status(404).send(`The Reviewer with this ID was not found.`)

  // Validate using destructring = result.error, to simplify the code
  const { error } = validateReviewer(req.body)

  // If invalid, return 400 - Bad request

  if (error) return res.status(400).send(error.details[0].message)

  // Update reviewer
  reviewer.name = req.body.name
  reviewer.email = req.body.email
  reviewer.password = req.body.passsword
  reviewer.telephone = req.body.telephone

  // Return the updated reviewer
  res.send(reviewer)
})

router.delete('/:id', (req, res) => {
  // Lookup the reviewer
  const reviewer = reviewers.find(
    e => e.id === parseInt(req.params.id)
  )

  // Not existing, return 404
  if (!reviewer) return res.status(404).send(`The reviewer with this ID was not found.`)

  // Delete
  const index = reviewers.indexOf(reviewer)
  reviewers.splice(index, 1)

  // Return the same reviewer by convention
  res.send(reviewer)
})

function validateReviewer (reviewer) {
  const schema = {
    name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    telephone: Joi.number().required()
  }

  return Joi.validate(reviewer, schema);
}

module.exports = router
