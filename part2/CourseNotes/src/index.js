import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import noteService from './services/notes'

import './index.css'

const Footer = () => {
	const footerStyle = {
		color: 'green',
		fontStyle: 'italic',
		fontSize: 16
	}

	return (
		<div style={footerStyle}>
			<br />
			<em>Note app, Department of Computer Science, University of Helsinki 2020</em>
		</div>
	)
}

const Notification = ({ message }) => {
	if (message === null) {
		return null
	}

	return (
		<div className="error">
			{message}
		</div>
	)
}

const Note = ({ note, toggleImp }) => {
	return (
		<li>
			{note.content}
			<button onClick={toggleImp}>
				Make {note.important ? 'Not Important' : 'Important'}
			</button>
		</li>

	)
}

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		noteService.getAll()
			.then(initialNotes => setNotes(initialNotes))
	}, [])

	// Need to update the server when a new note is added...

	const addNote = event => {
		event.preventDefault()

		const noteObject = {
			content: newNote,
			date: new Date().toISOString,
			important: Math.random() < 0.5,
			id: notes.length + 1
		}

		noteService.create(noteObject)
			.then(returnedNote => {
				setNotes(notes.concat(returnedNote))
				setNewNote('')
			})
	}

	const toggleImp = id => {
		const toggledNote = notes.find(note => note.id === id)
		const changedNote = { ...toggledNote, important: !toggledNote.important }
		noteService.update(id, changedNote)
			.then(returnedNote => {
				setNotes(notes.map(note => note.id !== id ? note : returnedNote))
			})
			.catch(error => {
				setErrorMessage(`Note '${changedNote.content}' was already deleted from the server`)

				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setNotes(notes.filter(note => note.id !== id))
			})
	}

	const shownNotes = showAll
		? notes
		: notes.filter(note => note.important)

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			<ul>
				{shownNotes.map(note =>
					<Note key={note.id} note={note} toggleImp={() => toggleImp(note.id)} />)}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={(event) => setNewNote(event.target.value)}></input>
				<button type="submit">save</button>
			</form>
			<button onClick={() => setShowAll(!showAll)}>{showAll ? "Show Important" : "Show All"}</button>
			<Footer />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))