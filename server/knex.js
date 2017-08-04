require('dotenv').config()
const knex = require('knex') ({
  dialect: 'pg',
  connection: process.env.DATABASE_URL
})

function noteList() {
  const query = knex
    .select('id', 'note')
    .from('notes')
  return query
}

function add(note) {
  const query = knex
    .insert(note)
    .into('notes')
  return query
}

module.exports = {
  noteList: noteList,
  add: add
}
