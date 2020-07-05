import React from 'react'
import Country from './Country'
import ListCountries from './ListCountries'

const Countries = ({ countries, filter, setFilter }) => {
	if (!filter) return <p>Search for a Country to show more!</p>
	if (countries.length > 20) return <p>Too many matches, specify another filter</p>
	if (countries.length === 0) return <p>No Match</p>

	if (countries.length !== 1) {
		return <ListCountries countries={countries} setFilter={setFilter} />
	}

	const country = countries[0]

	return <Country country={country} />
}

export default Countries