import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Note = ({note}) => <li>{note.content}</li>

const App = (props) => {
	const [notes, setNotes] = useState(props.notes)
	const [newNote, setNewNote] = useState('NoteTest')
	const [showAll, setShowAll] = useState(true)

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
			{ shownNotes.map(note => <Note key={note.id} note={note} />) }
		</ul>
		<form onSubmit={addNote}>
			<input value={newNote} onChange={(event) => setNewNote(event.target.value) }></input>
			<button type="submit">save</button>
		</form>
		<button onClick={() => setShowAll(!showAll)}>{showAll ? "Show Important" : "Show All"}</button>
		</div>
	)
}

const notes = [
	{
		'content': 'test',
		'id': 1
	},
	{
		'content': 'test2',
		'id': 2
	},
	{
		'content': 'testing3',
		'id': 3
	}
]

ReactDOM.render(<App notes={notes}/>, document.getElementById('root'))