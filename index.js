const express = require('express')

// Require Router Handlers
const electronicJournal = require('./routes/api/electronicJournal')
const comment = require('./routes/api/comment')
const lawyer = require('./routes/api/lawyer')

const app = express()

// Init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Entry point
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to our Scrum Master's Website</h1>`)
})

// Direct to Route Handlers
app.use('/api/electronicJournals', electronicJournal)
app.use('/api/comment', comment)
app.use('/api/lawyer', lawyer) 

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})

const port = process.env.PORT || 3000
app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
)
