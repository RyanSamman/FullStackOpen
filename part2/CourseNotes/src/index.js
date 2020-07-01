import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Note = ({ note }) => <li>{note.content}</li>

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)

	useEffect(() => {
		axios
			.get('http://localhost:3001/notes')
			.then((response) => setNotes(response.data))
	}, [])

	// Need to update the server when a new note is added...

	const addNote = (event) => {
		event.preventDefault()

		const noteObject = {
			content: newNote,
			date: new Date().toISOString,
			important: Math.random() < 0.5,
			id: notes.length + 1
		}

		setNotes(notes.concat(noteObject))
		setNewNote('')
	}

	const shownNotes = showAll
		? notes
		: notes.filter(note => note.important)

	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{shownNotes.map(note => <Note key={note.id} note={note} />)}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={(event) => setNewNote(event.target.value)}></input>
				<button type="submit">save</button>
			</form>
			<button onClick={() => setShowAll(!showAll)}>{showAll ? "Show Important" : "Show All"}</button>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))