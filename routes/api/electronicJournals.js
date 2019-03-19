const Joi = require('joi')
const express = require('express')
const router = express.Router()

router.use(express.json())

// We will be connecting using database
const ElectronicJournal = require('../../models/ElectronicJournal')

// @route  GET api/electronicJournals/test
// @desc   Tests electronicJournal route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'electronicJournal Works' }))

// @route  GET api/electronicJournals
// @desc   Gets all electronicJournals
// @access Public
router.get('/', async (req, res) => {
  const electronicJournals = await ElectronicJournal.find()
  res.json({ data: electronicJournals })
})

// @route  GET api/electronicJournals/:id
// @desc   Gets a specific electronic Journal by the ID
// @access Public
// router.get('/:id', (req, res) => {
//   // Find the electronic Journal with given id
//   const electronicJournal = electronicJournals.find(
//     e => e.id === parseInt(req.params.id)
//   )
//   // Send 404 error if not found
//   if (!electronicJournal) return res.status(404).send(`The electronicJournal with this ID was not found.`)
//   res.send(electronicJournal)
// })
router.get('/:id', async (req, res) => {
  const electronicJournal = await ElectronicJournal.findById(req.params.id)

  // Send 404 error if not found
  if (!electronicJournal) return res.status(404).send(`The electronicJournal with this ID was not found.`)
  res.send(electronicJournal)
})

// @route  POST api/electronicJournals
// @desc   Creates a new electronicJournal
// @access Public
// router.post('/', (req, res) => {
//   // Validate using destructring = result.error to simplify the code
//   const { error } = validateJournal(req.body)

//   // If invalid, return 400 - Bad request
//   if (error) return res.status(400).send(error.details[0].message)

//   // Create the electronic Journal, add to the array and display it.
//   const electronicJournal = {
//     id: electronicJournals.length + 1,
//     name: req.body.name,
//     desc: req.body.desc,
//     news: req.body.news
//   }
//   electronicJournals.push(electronicJournal)
//   res.send(electronicJournal)
// })

router.post('/', async (req, res) => {
  try {
    // Validate using destructring = result.error to simplify the code
    const { error } = validateJournal(req.body)

    // If invalid, return 400 - Bad request
    if (error) return res.status(400).send(error.details[0].message)
  } catch (error) {
    console.log(error)
  }
  // Create the electronic Journal, add to the array and display it.
  const newElectronicJournal = await ElectronicJournal.create(req.body)
  res.json({ msg: 'Electronic Journal was created Successfully', data: newElectronicJournal })
})

// @route  PUT api/electronicJournals/:id
// @desc   Update the value of current electronicJournal
// @access Public
router.put('/:id', async (req, res) => {
  try {
    // Lookup the electronic Journal
    const electronicJournal = await ElectronicJournal.findById(req.params.id)
    // If not existing, return 404
    if (!electronicJournal) return res.status(404).send(`The electronicJournal with this ID was not found.`)

    // Validate using destructring = result.error, to simplify the code
    const { error } = validateJournal(req.body)

    // If invalid, return 400 - Bad request
    if (error) return res.status(400).send(error.details[0].message)

    // Update electronic Journal
    const updatedElectronicJournal = await ElectronicJournal.updateOne(req.body)

    // Return the updated electronic Journal
    res.json({ msg: 'Electronic Journal updated successfully', data: updatedElectronicJournal })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }  
})

// @route  DELETE api/electronicJournals/:id
// @desc   Delete an electronic Journal
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    // Lookup the electronic Journal and Delete it
    const deletedElectronicJournal = await ElectronicJournal.findByIdAndRemove(req.params.id)

    // Not existing, return 404
    if (!deletedElectronicJournal) return res.status(404).send(`The electronicJournal with this ID was not found.`)

    // Return the same reviewer by convention
    res.json({ msg: 'Electronic Journal Deleted successfully', data: deletedElectronicJournal })
  } catch (error) {
    console.log(error)
  }
})

// A function that takes electronicJournal and validates it against the schema
function validateJournal (electronicJournal) {
  const schema = {
    companyName: Joi.string().min(3).max(20).required(),
    companyDescription: Joi.string().min(3).max(1000),
    companyDate: Joi.date()
  }

  return Joi.validate(electronicJournal, schema)
}

module.exports = router
