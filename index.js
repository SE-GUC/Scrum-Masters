const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// DB config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// Require Router Handlers
const user = require('./routes/api/user')
const electronicJournal = require('./routes/api/electronicJournals')
const comment = require('./routes/api/comment')
const company = require('./routes/api/company')
const notification = require('./routes/api/notification')
const payment = require('./routes/api/payment')

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
app.use('/api/payment', payment)

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})

const port = process.env.PORT || 3001

app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
)
