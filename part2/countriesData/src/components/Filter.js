import React from 'react'

const Filter = ({ filter, setFilter }) => {
	return (
		<input value={filter} onChange={setFilter} placeholder="Search for a Country" />
	)
}

export default Filter