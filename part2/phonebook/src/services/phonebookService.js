import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getPeople = () => {
	return axios.get(url)
		.then(res => res.data)
}

const updatePerson = (id, newPerson) => {
	return axios.put(`${url}/${id}`, newPerson)
		.then(res => res.data)

}

const createPerson = (newNumber) => {
	return axios.post(url, newNumber)
		.then(res => res.data)
}

const deletePerson = id => {
	return axios.delete(`${url}/${id}`)
		.then(res => res.data)
}

export default { getPeople, updatePerson, createPerson, deletePerson }