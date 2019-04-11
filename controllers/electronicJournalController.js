const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const ElectronicJournal = require('../models/ElectronicJournal')

exports.test = async (req, res) => {
  res.json({ msg: 'electronicJournal Works' })
}

exports.listAllElectronicJournals = async (req, res) => {
  try {
    const electronicJournals = await ElectronicJournal.find()
    res.json({ data: electronicJournals })
  } catch (error) {
    console.log(error)
  }
}

exports.getElectronicJournal = async (req, res) => {
  try {
    const electronicJournal = await ElectronicJournal.findById(req.params.id)

    // Send 404 error if not found
    if (!electronicJournal) return res.status(404).send(`The electronicJournal with this ID was not found.`)
    res.send(electronicJournal)
  } catch (error) {
    console.log(error)
  }
}

exports.createElectronicJournal = async (req, res) => {
  try {
    // Validate using destructring = result.error to simplify the code
    const { error } = validateJournal(req.body)

    // If invalid, return 400 - Bad request
    if (error) return res.status(400).send(error.details[0].message)
    // Create the electronic Journal, add to the array and display it.
    const newElectronicJournal = await ElectronicJournal.create(req.body)
    res.json({ msg: 'Electronic Journal was created Successfully', data: newElectronicJournal })
  } catch (error) {
    console.log(error)
  }
}

exports.updateElectronicJournal = async (req, res) => {
  try {
    // Validate using destructring = result.error, to simplify the code
    const { error } = validateJournal(req.body)

    // If invalid, return 400 - Bad request
    if (error) return res.status(400).send(error.details[0].message)

    // Lookup the electronic Journal and update it
    const updatedElectronicJournal = await ElectronicJournal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    // If not existing, return 404
    if (!updatedElectronicJournal) return res.status(404).send(`The electronicJournal with this ID was not found.`)

    // Return the updated electronic Journal
    res.json({ msg: 'Electronic Journal updated successfully', data: updatedElectronicJournal })
  } catch (error) {
    // We will be handling the error later
    console.log(error)
  }
}

exports.deleteElectronicJournal = async (req, res) => {
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
}

function validateJournal (electronicJournal) {
  const schema = {
    companyId: Joi.objectId(),
    companyName: Joi.string().min(3).max(200).required(),
    companyDescription: Joi.string().min(3).max(1000),
    companyDate: Joi.date()
  }

  return Joi.validate(electronicJournal, schema)
}
