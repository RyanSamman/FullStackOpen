import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Weather from './Weather'
import DataPoint from './DataPoint'

const Country = ({ country }) => {
	const [weatherData, setWeatherData] = useState()
	useEffect(() => {
		axios
			.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.capital}`)
			.then(response => setWeatherData(response.data))
	}, [country])

	return (
		<>
			<h1>{country.name}</h1>
			<DataPoint name="Capital" data={country.capital} />
			<DataPoint name="Population" data={country.population} />

			<h2>Languages</h2>
			<ul>
				{country.languages.map(language => <li key={language.name}>{language.name}</li>)}
			</ul>
			<img src={country.flag} height="200rem" alt={`${country.name}'s flag`} />
			<Weather weatherData={weatherData} />
		</>
	)
}

export default Country