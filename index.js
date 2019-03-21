const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

// Require Router Handlers
const user = require('./routes/api/user')
const electronicJournal = require('./routes/api/electronicJournal')
const comment = require('./routes/api/comment')
const company = require('./routes/api/company')
const notification = require('./routes/api/notification')

// Connect to mongo
const keys = require('./config/keys')
mongoose
	.connect(keys.mongoURI)
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.log(err))

// Init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to our Scrum Master's Website</h1>`)
})

// Direct to Route Handlers
app.use('/api/user', user)
app.use('/api/electronicJournals', electronicJournal)
app.use('/api/comment', comment)
app.use('/api/company', company)
app.use('/api/notification', notification)

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})

const port = process.env.PORT || 3000

app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
)
