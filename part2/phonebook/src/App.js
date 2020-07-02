import React, { useState, useEffect } from 'react'

// Services
import phonebookService from './services/phonebookService'

// Components
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import People from './components/People'

const App = () => {
	const [people, setPeople] = useState([])

	useEffect(() => {
		phonebookService.getPeople()
			.then(numbers => setPeople(numbers))
	}, [])

	const [filter, setFilter] = useState('')

	const shownPeople = filter
		? people.filter((person) => person.name.match(new RegExp(filter, 'i')))
		: people

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} onChange={(event) => setFilter(event.target.value)} />
			<h2>Add a new Number</h2>
			<PersonForm people={people} setPeople={setPeople} />
			<h2>Numbers</h2>
			<People people={shownPeople} setPeople={setPeople} />
		</div>
	)
}

export default App