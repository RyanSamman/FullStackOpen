import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import People from './components/People'

const App = () => {
	const [people, setPeople] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelaceh', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])

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