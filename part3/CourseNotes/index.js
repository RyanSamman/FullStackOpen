const express = require('express')
const app = express()

const requestLogger = (req, res, next) => {
	console.log('Method:', req.method)
	console.log('Path:', req.path)
	console.log('Body:', req.body)
	console.log('-------')
	next()
}

app.use(requestLogger);

app.use(express.json())

let notes = [
	{
		id: 1,
		content: "HTML is easy",
		date: "2019-05-30T17:30:31.098Z",
		important: true
	},
	{
		id: 2,
		content: "Browser can execute only Javascript",
		date: "2019-05-30T18:39:34.091Z",
		important: false
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		date: "2019-05-30T19:20:14.298Z",
		important: true
	}
]

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
	res.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
	const id = parseInt(request.params.id, 10)
	const note = notes.find(note => note.id === id)
	if (note) return response.json(note)
	return response.status(404).end()
})

const generateId = () => {
	const maxId = notes.length > 0
		? Math.max(...notes.map(n => n.id))
		: 0
	return maxId + 1
}

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (!body.content) {
		return response.status(400).json({
			error: 'content missing'
		})
	}

	const note = {
		content: body.content,
		important: body.important || false,
		date: new Date(),
		id: generateId(),
	}

	notes = notes.concat(note)

	response.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
	const id = parseInt(req.params.id, 10)
	console.log(id)
	notes = notes.filter(note => note.id !== id)
	res.status(204).end()
})

app.use((_req, res) => res.status(404).json({ error: 'unknown endpoint' }))

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})