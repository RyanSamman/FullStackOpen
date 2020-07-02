import React, { useState } from 'react'

// Services
import phonebookService from '../services/phonebookService'

const PersonForm = ({ people, setPeople }) => {
	const [formName, setFormName] = useState('')
	const [formNumber, setFormNumber] = useState('')

	const addPerson = (event) => {
		event.preventDefault()
		let newPerson = { name: formName, number: formNumber }
		const match = people.find((person) => person.name === formName)
		if (match) {
			const isConfirmed = window.confirm(`${match.name} is already added to the phonebook, replace the old number with a new one?`)
			if (!isConfirmed) return
			return phonebookService.updatePerson(match.id, newPerson)
				.then(updatedPerson => {
					setPeople(people.map(person => person.id === updatedPerson.id
						? updatedPerson
						: person
					))
					setFormName('')
					setFormNumber('')
				})
		}

		phonebookService.createPerson(newPerson)
			.then(createdPerson => {
				setPeople(people.concat(createdPerson))
				setFormName('')
				setFormNumber('')
			})
	}

	return (
		<form onSubmit={addPerson}>
			<div>
				Name: <input value={formName} onChange={(event) => setFormName(event.target.value)} />
			</div>
			<div>
				Number: <input value={formNumber} onChange={(event) => setFormNumber(event.target.value)} />
			</div>
			<div>
				<button type="submit">Add</button>
			</div>
		</form>
	)
}

export default PersonForm