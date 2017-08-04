const express = require('express')
const bodyParser = require('body-parser')
const notes = require('./knex')
const path = require('path')

const app = express()

const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)
const jsonParser = bodyParser.json()

app.use(staticMiddleware)

app.use(jsonParser)

app.get('/notes', (req, res) => {
  console.log(notes.noteList())
  notes.noteList()
    .then(result => {
      console.log(result)
      res.json(result)
    })
})

app.post('/notes', (req, res) => {
  notes.add(req.body)
    .then(() => {
      console.log(notes.noteList())
    })
})

app.listen(3000, () => {
  console.log('Listening on 3000!')
})
