import React from 'react'

const Filter = ({ filter, onChange }) => (
	<div>
		Filter: <input value={filter} onChange={onChange}></input>
	</div>
)

export default Filter