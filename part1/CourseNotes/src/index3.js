import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => (
	<button onClick={onClick}>
		{text}
	</button>
)

const App = (props) => {
	const [left, setLeft] = useState(0)
	const [right, setRight] = useState(0)
	const [allClicks, setAll] = useState([])

	console.log('refresh')

	const handleLeftClick = () => {
		// New Object should be created, not changing the old object,
		// It checks if the object has changed before refreshing the component, expecially in pure components
		// https://daveceddia.com/why-not-modify-react-state-directly/#:~:text=Mutating%20state%20directly%20can%20lead,its%20parent%20re%2Drenders).
		setAll(allClicks.concat('L'))
		setLeft(left + 1)
	}

	const handleRightClick = () => {
		setAll(allClicks.concat('R'))
		setRight(right + 1)
	}

	return (
		<div>
			<div>
				{left}
				<Button onClick={handleLeftClick} text="left" />
				<Button onClick={handleRightClick} text="right" />
				{right}
				<p>{allClicks.join(' ')}</p>
			</div>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));