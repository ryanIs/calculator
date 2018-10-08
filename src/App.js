/*
	TODO:

	- Set height of each grid item.

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
          <div className="header">
            <h1 className="header-h1">
              Calculator
            </h1>
          </div>
					<div className="calculator">
						<div className="calculator-output">
							0
						</div>

						<div className="calculator-buttons">
							<div className="calculator-button C-button">C</div>
							<div className="calculator-button not-button funct-btn">+/-</div>
							<div className="calculator-button percent-button funct-btn">%</div>
							<div className="calculator-button divide-button funct-btn">/</div>

							<div className="calculator-button seven-button number-btn">7</div>
							<div className="calculator-button eight-button number-btn">8</div>
							<div className="calculator-button nine-button number-btn">9</div>
							<div className="calculator-button multiply-button funct-btn">X</div>

							<div className="calculator-button four-button number-btn">4</div>
							<div className="calculator-button five-button number-btn">5</div>
							<div className="calculator-button six-button number-btn">6</div>
							<div className="calculator-button minus-button funct-btn">-</div>

							<div className="calculator-button one-button number-btn">1</div>
							<div className="calculator-button two-button number-btn">2</div>
							<div className="calculator-button three-button number-btn">3</div>
							<div className="calculator-button plus-button funct-btn">+</div>

							<div className="calculator-button zero-button number-btn">0</div>
							<div className="calculator-button point-button number-btn">.</div>
							<div className="calculator-button equal-button funct-btn">=</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
