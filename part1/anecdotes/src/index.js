import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Anecdote, GreatestAnecdote } from './AnecdotesComponents'

const App = ({ anecdotes }) => {
  const getRandomAnecdoteIndex = () => Math.floor(Math.random() * anecdotes.length)

  const [selected, setSelected] = useState(() => getRandomAnecdoteIndex())
  const [anecdoteArray, setAnecdoteArray] = useState(() => Array(6).fill(0))
  const [greatest, setGreatest] = useState(0)

  const addAnecdoteVote = () => {
    const newArray = [...anecdoteArray]
    newArray[selected]++
    setAnecdoteArray(newArray)

    setGreatest(newArray.reduce((grtest, _currentValue, currentIndex, array) => {
      if (array[currentIndex] > array[grtest]) return currentIndex
      return grtest
    }, 0))
  }

  return (
    <>
      <Anecdote greatest={greatest} anecdote={anecdotes[selected]} votes={anecdoteArray[selected]} />
      <button onClick={addAnecdoteVote}>vote</button>
      <button onClick={() => setSelected(getRandomAnecdoteIndex())}>next anectote</button>
      <br /><br />
      <GreatestAnecdote greatest={greatest} anecdotes={anecdotes} anecdoteArray={anecdoteArray} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
