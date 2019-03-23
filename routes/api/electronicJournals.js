const express = require('express')
const router = express.Router()
const electronicJournalController = require('../../controllers/electronicJournalController')

router.use(express.json())

router.get('/', electronicJournalController.listAllElectronicJournals)
router.get('/:id', electronicJournalController.getElectronicJournal)

router.post('/', electronicJournalController.createElectronicJournal)
router.put('/:id', electronicJournalController.updateElectronicJournal)
router.delete('/:id', electronicJournalController.deleteElectronicJournal)

module.exports = router
