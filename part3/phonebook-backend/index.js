const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

let phonebook = [
	{
		"name": "Arto Hellas",
		"number": "040-123456",
		"id": 1
	},
	{
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
		"id": 2
	},
	{
		"name": "Dan Abramov",
		"number": "12-43-234345",
		"id": 3
	},
	{
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
		"id": 4
	}
]

// POST /api/persons 200      61 - 4.896 ms {body}
// ^:method ^:path     ^status  ^ 

morgan.token('body', (req, res) => JSON.stringify(req.body))

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

app.get('/api/persons', (req, res) => {
	res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
	const id = parseInt(req.params.id, 10)
	const person = phonebook.find((person) => person.id === id)
	if (!person) return res.sendStatus(404)
	res.json(person)
})

app.get('/info', (req, res) => {
	let html = `<p>Phonebook has info for ${phonebook.length} people</p>
	<p>${new Date().toString()}</p>`
	res.send(html)
})

app.post('/api/persons', logger, (req, res) => {
	console.log(req.body)
	let { name, number } = req.body
	if (!name || !number) return res.status(400).send("Missing Name or Number")
	// Can add code down there to get the max ID, and increment
	// Instead of randomly generating an ID
	const isDuplicate = phonebook.find((person) => person.name === name)
	if (isDuplicate) return res.status(400).send("Duplicate Name")
	const newNote = {
		name,
		number,
		date: new Date(),
		id: Math.floor(Math.random() * 100)
	}

	phonebook.push(newNote)
	// Should send a status of 201 for created resource, not 200
	res.json(newNote)
})

app.delete('/api/persons/:id', (req, res) => {
	const id = parseInt(req.params.id, 10)
	phonebook = phonebook.filter((note) => note.id !== id)
	res.sendStatus(204)
})

app.listen(3001, () => console.log('Server started on port 3001'))
