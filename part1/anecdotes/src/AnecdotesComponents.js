import React from 'react';

const Votes = ({ votes }) => {
	if (votes) return <p>has {votes} votes</p>
	return <></>
}

export const Anecdote = ({ anecdote, votes }) => {
	return (
		<div>
			<div>{anecdote}</div>
			<Votes votes={votes} />
		</div>
	)
}

export const GreatestAnecdote = ({ anecdotes, anecdoteArray, greatest }) => {
	if (!anecdoteArray[greatest]) return <></>
	return <Anecdote anecdote={anecdotes[greatest]} votes={anecdoteArray[greatest]} />
}