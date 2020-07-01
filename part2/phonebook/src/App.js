import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import People from './components/People'

// 'JSON Database' route
// http://localhost:3001/persons

const App = () => {
	const [people, setPeople] = useState([])

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then((response) => setPeople(response.data))
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
			<People people={shownPeople} />
		</div>
	)
}

export default App