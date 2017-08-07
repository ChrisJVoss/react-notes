require('dotenv').config()
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

app.listen(process.env.MY_SECRET_PORTAL, () => {
  console.log('Listening on supersecretportal!')
})
