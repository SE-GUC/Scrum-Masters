const express = require('express')
const app = express()
const comment = require('./routes/api/comment')

app.use(express.json())
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to Our website</h1>
  <a href="/api/comment">comments</a>`
  )
})

app.use('/api/comment', comment)

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to our Scrum Master's Website</h1>`)
})

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})

const port = 4001
app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
)
