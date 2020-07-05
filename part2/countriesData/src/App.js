import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'

// process.env.REACT_APP_WEATHER_API_KEY

const App = () => {
	const [filter, setFilter] = useState('')
	const [countries, setCountries] = useState([])

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then((response) => setCountries(response.data))
	}, [])

	let filteredCountries

	try {
		filteredCountries = filter
			? countries.filter(country => country.name.match(new RegExp(filter, 'i')))
			: countries
	} catch (err) {
		//TODO Remove if ever in production
		console.log('Filter regex error:', err)
		filteredCountries = []
	}

	return (
		<>
			<Filter filter={filter} setFilter={event => setFilter(event.target.value)} />
			<Countries countries={filteredCountries} filter={filter} setFilter={setFilter} />
			<p></p>
		</>
	)
}

export default App