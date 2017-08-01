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
      res.json(result)
    })
})

app.listen(3000, () => {
  console.log('Listening on 3000!')
})
