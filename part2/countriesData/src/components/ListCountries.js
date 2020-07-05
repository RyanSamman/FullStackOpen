import React from 'react'

const ListCountries = ({ countries, setFilter }) => {
	return (
		<div>
			{countries.map(country =>
				<p key={country.name}>
					{country.name} <button onClick={() => setFilter(country.name)}>show</button>
				</p>
			)}
		</div >
	)
}

export default ListCountries