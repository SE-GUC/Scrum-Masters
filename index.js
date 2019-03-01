const express = require('express')
const app = express()
app.use(express.json())

// Require Router Handlers
const electronicJournal = require('./routes/api/electronicJournal')
const comment = require('./routes/api/comment')
const admin = require('./routes/api/admin')
const company = require('./routes/api/company')
const lawyer = require('./routes/api/lawyer')

const app = express()

// Init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {

    res.send(`<h1>Welcome to our Scrum Master's Website</h1>`)
  
  
  `<a href="/api/comment">comments</a>`

})

// Direct to Route Handlers
app.use('/api/electronicJournals', electronicJournal)
app.use('/api/comment', comment)
app.use('/api/admin', admin)
app.use('/api/company', company)
app.use('/api/lawyer', lawyer) 

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})




const port = process.env.PORT || 3000


app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
)
