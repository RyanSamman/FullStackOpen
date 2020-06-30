import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Filter = ({filter, onChange}) => (
  <div>
  Filter: <input value={filter} onChange={onChange}></input>
  </div> 
)

const PersonForm = ({ people, setPeople }) => {
  const [ formName, setFormName ] = useState('')
  const [ formNumber, setFormNumber ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (people.find((person) => person.name === formName)) return alert(`${formName} is already added to the phonebook`)
    setPeople(people.concat({name: formName, number: formNumber}))
    setFormName('')
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={formName} onChange={(event) => setFormName(event.target.value)}/>
      </div>
      <div>
        Number: <input value={formNumber} onChange={(event) => setFormNumber(event.target.value)}/>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const People = ({people}) => (
<ul>
  {people.map((person) => <li key={person.name}>{person.name} {person.number}</li>)}
</ul>)

const App = () => {
  const [ people, setPeople ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelaceh', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [filter, setFilter] = useState('')

  const shownPeople = filter 
    ? people.filter((person) => person.name.match(new RegExp(filter, 'i')))
    : people

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={(event) => setFilter(event.target.value)} />
      <h2>Add a new Number</h2>
      <PersonForm people={people} setPeople={setPeople} />
      <h2>Numbers</h2>
      <People people={shownPeople}/>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))