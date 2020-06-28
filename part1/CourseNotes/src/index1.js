import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Hello = (props) => {
	return (
		// <> is an empty element, allows multiple elements to be pushed in line
		// this is called a fragment
		<>
			<p>
				Hello {props.name}, you are {props.age} years old
      </p>
			<p>
				The time is {props.time}
			</p>
		</>
	)
}

const App = () => {
	const now = new Date().toString()
	let a = 10
	const b = 20

	// Hello props
	const name = 'Ryan'
	const age = 18

	// name and age are props and will be passed into hello
	// as the 'props' object
	return (
		<div>
			<Hello name={name} age={age} time={now} />
			<p>
				{a} plus {b} is {a + b}
			</p>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById(root));