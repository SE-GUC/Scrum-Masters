const Joi = require('joi')
const express = require('express')
const router = express.Router()

router.use(express.json())

// We will be connecting using database
const ElectronicJournal = require('../../models/electronicJournal')

const electronicJournals = [
  new ElectronicJournal(
    1,
    'The Prince',
    'Best company 1',
    'We opened a new branch in Cairo'
  ),
  new ElectronicJournal(
    2,
    'The Prince 2',
    'Best company 2',
    'We opened a new branch in Alex'
  ),
  new ElectronicJournal(
    3,
    'The Prince 3',
    'Best company 3',
    'We opened a new branch in NY'
  ),
  new ElectronicJournal(
    4,
    'The Prince 4 ',
    'Best company 4',
    'We opened a new branch in Queens'
  ),
  new ElectronicJournal(
    5,
    'The Prince 5',
    'Best company 5',
    'We opened a new branch in Brooklyn'
  ),
  new ElectronicJournal(
    6,
    'The Prince 6',
    'Best company 6',
    'We opened a new branch in Manhateen'
  ),
  new ElectronicJournal(
    7,
    'The Prince 7',
    'Best company 7',
    'We opened a new branch in Washington'
  ),
  new ElectronicJournal(
    8,
    'The Prince 8',
    'Best company 8',
    'We opened a new branch in Albama'
  )
]

router.get('/', (req, res) => res.json({ data: electronicJournals }))

router.get('/:id', (req, res) => {
  // Find the electronic Journal with given id
  const electronicJournal = electronicJournals.find(
    e => e.id === parseInt(req.params.id)
  )
  // Send 404 error if not found
  if (!electronicJournal) return res.status(404).send(`The electronicJournal with this ID was not found.`)
  res.send(electronicJournal)
})

router.post('/', (req, res) => {
  // Validate using destructring = result.error to simplify the code
  const { error } = validateJournal(req.body)

  // If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message)

  // Create the electronic Journal, add to the array and display it.
  const electronicJournal = {
    id: electronicJournals.length + 1,
    name: req.body.name,
    desc: req.body.desc,
    news: req.body.news
  }
  electronicJournals.push(electronicJournal)
  res.send(electronicJournal)
})

router.put('/:id', (req, res) => {
  // Lookup the electronic Journal

  const electronicJournal = electronicJournals.find(
    e => e.id === parseInt(req.params.id)
  )
  // If not existing, return 404
  if (!electronicJournal) return res.status(404).send(`The electronicJournal with this ID was not found.`)

  // Validate using destructring = result.error, to simplify the code
  const { error } = validateJournal(req.body)

  // If invalid, return 400 - Bad request

  if (error) return res.status(400).send(error.details[0].message)

  // Update electronic Journal
  electronicJournal.name = req.body.name
  electronicJournal.desc = req.body.desc
  electronicJournal.news = req.body.news

  // Return the updated electronic Journal
  res.send(electronicJournal)
})

router.delete('/:id', (req, res) => {
  // Lookup the electronic Journal
  const electronicJournal = electronicJournals.find(
    e => e.id === parseInt(req.params.id)
  )

  // Not existing, return 404
  if (!electronicJournal) return res.status(404).send(`The electronicJournal with this ID was not found.`)

  // Delete
  const index = electronicJournals.indexOf(electronicJournal)
  electronicJournals.splice(index, 1)

  // Return the same reviewer by convention
  res.send(electronicJournal)
})

// A function that takes electronicJournal and validates it against the schema
function validateJournal (electronicJournal) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    desc: Joi.string(),
    news: Joi.string()
  }

  return Joi.validate(electronicJournal, schema)
}

module.exports = router
