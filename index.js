const express = require('express')
const app = express()

const electronicJournal = require('./routes/api/electronicJournal')

app.use(express.json())

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to our Scrum Master's Website</h1>`)
})

// Direct routes to appropriate files
app.use('/api/electronicJournals', electronicJournal)

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})

const port = process.env.PORT || 3000
app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
)
