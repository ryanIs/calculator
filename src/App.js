/*
	TODO:

	- Set height of each grid item.

	- Make the ODD child elements green.

	- Apply (decent) CSS to the children elements.
*/
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="wrapper">
					<div className="calculator">
						<div className="calculator-output">
							0
						</div>

						<div className="calculator-buttons">
							<div className="calculator-button C-button">C</div>
							<div className="calculator-button not-button">+/-</div>
							<div className="calculator-button percent-button">%</div>
							<div className="calculator-button divide-button">/</div>

							<div className="calculator-button 7-button">7</div>
							<div className="calculator-button 8-button">8</div>
							<div className="calculator-button 9-button">9</div>
							<div className="calculator-button multiply--button">X</div>

							<div className="calculator-button 4-button">4</div>
							<div className="calculator-button 5-button">5</div>
							<div className="calculator-button 6-button">6</div>
							<div className="calculator-button minus-button">-</div>

							<div className="calculator-button 1-button">1</div>
							<div className="calculator-button 2-button">2</div>
							<div className="calculator-button 3-button">3</div>
							<div className="calculator-button plus-button">+</div>

							<div className="calculator-button 0-button">0</div>
							<div className="calculator-button -button">0</div>
							<div className="calculator-button point-button">.</div>
							<div className="calculator-button equal-button">=</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
