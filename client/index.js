require('dotenv').config()
import React from 'react'
import ReactDOM from 'react-dom'

class NoteList extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    fetch('/notes')
      .then(response => response.json())
      .then(notes => this.props.updateState(notes))
  }
  render() {
    return <ul>{this.props.parentState.notes.map((note) => {
      return <li key={note.id}>{note.note}</li>
    })}
    </ul>
  }
}

class AddNote extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    const postNote = (newNote) => {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      }
      return fetch('/notes', fetchData)
    }
    event.preventDefault()
    const formData = new FormData(event.target)
    let formValue = {
      note: formData.get('note')
    }
    const getNewNoteList = () => {
      fetch('/notes')
        .then(response => response.json())
        .then(notes => this.props.updateState(notes))
    }
    postNote(formValue)
      .then(getNewNoteList)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input name="note"/>
        </div>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {notes: []}
    this.getState = this.getState.bind(this)
  }
  getState(newState) {
    this.setState({notes: newState})
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <NoteList parentState={this.state} updateState={this.getState}/>
        </div>
        <div className="col-md-4">
          <AddNote parentState={this.state} updateState={this.getState}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-element')
)
