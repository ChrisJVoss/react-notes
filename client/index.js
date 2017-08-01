import React from 'react'
import ReactDOM from 'react-dom'

class NoteList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {notes: []}
  }
  componentDidMount() {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(notes => this.setState({notes: notes}))
  }
  render() {
    return <ul>{this.state.notes.map((note) => {
      return <li key={note.id}>{note.note}</li>
    })}
    </ul>
  }
}

ReactDOM.render(
  <NoteList />,
  document.getElementById('react-element')
)
