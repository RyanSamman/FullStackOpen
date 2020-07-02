import React, { useState, useEffect } from 'react'
import './index.css'

// Services
import phonebookService from './services/phonebookService'

// Components
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import People from './components/People'

const Notification = ({ notification }) => {
	if (notification === null) return null
	return (
		<div className={`notification ${notification.type}`}>
			{notification.text}
		</div>
	)
}

const App = () => {
	const [people, setPeople] = useState([])
	const [notification, setNotification] = useState(null)

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
			<Notification notification={notification} />
			<Filter filter={filter} onChange={(event) => setFilter(event.target.value)} />
			<h2>Add a new Number</h2>
			<PersonForm people={people} setPeople={setPeople} setNotification={setNotification} />
			<h2>Numbers</h2>
			<People people={shownPeople} setPeople={setPeople} setNotification={setNotification} />
		</div>
	)
}

export default App