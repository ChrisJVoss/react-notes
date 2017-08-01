const knex = require('knex') ({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/notes'
})

function noteList() {
  const query = knex
    .select('id', 'note')
    .from('notes')
  return query
}

module.exports = {
  noteList: noteList
}
