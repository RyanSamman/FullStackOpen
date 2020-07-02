import React from 'react'

import phonebookService from '../services/phonebookService'

const People = ({ people, setPeople }) => {

	const deletePerson = personToDelete => {
		if (window.confirm(`Delete ${personToDelete.name} ?`)) {
			phonebookService.deletePerson(personToDelete.id)
				.then((deletedPerson) => {
					setPeople(people.filter(person => person.id !== personToDelete.id))
				})
		}
	}

	return (
		<ul>
			{people.map(person => {
				return <li key={person.name}>
					{person.name} {person.number}
					<button onClick={() => deletePerson(person)}>Delete</button>
				</li>
			})}
		</ul >
	)
}


export default People