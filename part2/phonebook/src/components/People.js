import React from 'react'

import phonebookService from '../services/phonebookService'

const People = ({ people, setPeople, setNotification }) => {

	const deletePerson = personToDelete => {
		if (window.confirm(`Delete ${personToDelete.name} ?`)) {
			phonebookService.deletePerson(personToDelete.id)
				.then((deletedPerson) => {
					setPeople(people.filter(person => person.id !== deletedPerson.id))
				})
				.catch(err => {
					setPeople(people.filter(person => person.id !== personToDelete.id))
					setNotification({
						type: 'error',
						text: `Information of ${personToDelete.name} has already been removed from server`
					})

					setTimeout(() => setNotification(null), 5000)
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