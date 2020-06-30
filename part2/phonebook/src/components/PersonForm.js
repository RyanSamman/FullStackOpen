import React, { useState } from 'react'

const PersonForm = ({ people, setPeople }) => {
	const [formName, setFormName] = useState('')
	const [formNumber, setFormNumber] = useState('')

	const addPerson = (event) => {
		event.preventDefault()
		if (people.find((person) => person.name === formName)) return alert(`${formName} is already added to the phonebook`)
		setPeople(people.concat({ name: formName, number: formNumber }))
		setFormName('')
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