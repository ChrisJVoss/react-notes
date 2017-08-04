import React from 'react'
import ReactDOM from 'react-dom'

class NoteList extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(notes => this.props.updateState(notes))
  }
  render() {
    console.log(this.props.parentState.notes)
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
      return fetch('http://localhost:3000/notes', fetchData)
      .then(response => {
        return response.json()
      })
      .then(notes => this.props.updateState(notes))
    }
    event.preventDefault()
    const formData = new FormData(event.target)
    let formValue = {
      note: formData.get('note')
    }
    postNote(formValue)
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
      <div>
        <NoteList parentState={this.state} updateState={this.getState}/>
        <AddNote parentState={this.state} updateState={this.getState}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react-element')
)
