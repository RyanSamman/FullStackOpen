import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Votes = ({votes}) => {
if (votes) return <p>has {votes} votes</p>
  return <></>
}

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
      <div>{anecdote}</div>
      <Votes votes={votes}/>
    </>
  )
}

const GreatestVotes = ({anecdotes, anecdoteArray, greatest}) => {
  console.log(anecdotes, anecdoteArray, greatest)
  if (!greatest) return <></>
  return <Anecdote anecdote={anecdotes[greatest]} votes={anecdoteArray[greatest]} />
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(() => Math.floor(Math.random() * anecdotes.length))
  const selectRandomAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const [anecdoteArray, setAnecdoteArray] = useState(() => Array(6).fill(0))

  const [greatest, setGreatest] = useState()

  const addAnecdoteVote = () => {
    const newArray = [...anecdoteArray]
    newArray[selected]++
    setAnecdoteArray(newArray)

    let x = anecdoteArray.reduce((grtest, currentValue, currentIndex, array) => {
      console.log(array[currentIndex], array[grtest] , currentIndex, )
      if (array[currentIndex] > array[grtest]) return currentIndex
      return grtest
    }, 0)
    console.log({x})
  }

  return (
    <>
      <Anecdote greatest={greatest} anecdote={anecdotes[selected]} votes={anecdoteArray[selected]} />
      <button onClick={addAnecdoteVote}>vote</button>
      <button onClick={selectRandomAnecdote}>next anectote</button>
      <GreatestVotes greatest={greatest} anecdotes={anecdotes} anecdoteArray={anecdoteArray}/>
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
