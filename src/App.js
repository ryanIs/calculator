/*
	TODO:

	- Implement commas into system and checking

	- Detect for MAX CHARACTERS (without commas)

	- Add dynaic CSS for when characters exceed 10 (no scrollbar should appear in output)

	- Test and add final touch-up to CSS.
*/
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);

		this.MAX_OUTPUT_LENGTH = 16;

		this.state = {
			output: "0",
			storedOutput: null,
			operator: null,
		};
	}

	componentDidUpdate() {
		// Handle smaller number size.
	}

	resetCalculatorState() {
		this.setState({
			output: "0",
			storedOutput: null,
			operator: null
		})
	}

	/**
	 * Appends a character to the output.
	 * @param input {String} - The input to be appended.
	 */
	inputButton  = (input) => {
		let newValue = this.state.output + input;

		// Number of characters in output cannot exceed MAX_OUTPUT_LENGTH
		if(this.state.output.length >= this.MAX_OUTPUT_LENGTH)
			return;

		// Check for initial 0
		if(this.state.output === "0" || this.state.equalHitLast) { 
			newValue = String(input);

			this.setState({
				equalHitLast: false
			});
		}

		// There can only be one decimal point
		if(input == "." && this.state.output.indexOf(".") != -1) {
			return;
		}

		// Update the render
		this.setState({
			output: newValue
		});
	}

	clearButton  = () => {
		this.resetCalculatorState();
	}

	actionButton  = (action) => {
		var oldOutput = this.state.output;

		this.setState({
			storedOutput: oldOutput,
			output: "0",
			operator: action,
			equalHitLast: false
		});
	}

	changeButton = (outputChanger) => {

		// Negate turns the current output negative
		if(outputChanger == "negate") {
			this.setState({
				output: (parseInt(this.state.output) * -1).toString()
			})
		}

		// Percent changes the current output to equal [output %] of the stored output
		else if(outputChanger == "percent") {
			if(this.state.storedOutput != null) {

				let numOutput = parseFloat(this.state.output),
					numStoredOutput = parseFloat(this.state.storedOutput);

				this.setState({
					output: ((numOutput * 0.01) * numStoredOutput).toString()
				})

			} else {
				this.resetCalculatorState();
			}
		}
	}

	equalButton = () => {
		let calculatedValue = 0;

		// Calculation
		if(this.state.storedOutput != null && this.state.operator != null) {
			if(this.state.operator == "+") {
				calculatedValue = parseFloat(this.state.storedOutput) + parseFloat(this.state.output);
			} else if(this.state.operator == "-") {
				calculatedValue = parseFloat(this.state.storedOutput) - parseFloat(this.state.output);
			} else if(this.state.operator == "*") {
				calculatedValue = parseFloat(this.state.storedOutput) * parseFloat(this.state.output);
			} else if(this.state.operator == "/") {
				calculatedValue = parseFloat(this.state.storedOutput) / parseFloat(this.state.output);
			} 
		}

		// Update state
		this.setState({
			output: calculatedValue.toString(),
			operator: null,
			equalHitLast: true
		})
	}

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
							{this.state.output}
						</div>

						<div className="calculator-buttons">
							<div className="calculator-button C-button" onClick={this.clearButton}>C</div>
							<div className="calculator-button negate-button funct-btn" onClick={() => this.changeButton("negate")}>+/-</div>
							<div className="calculator-button percent-button funct-btn" onClick={() => this.changeButton("percent")}>%</div>
							<div className="calculator-button divide-button funct-btn" onClick={() => this.actionButton("/")}>/</div>

							<div className="calculator-button seven-button number-btn" onClick={() => this.inputButton("7")}>7</div>
							<div className="calculator-button eight-button number-btn" onClick={() => this.inputButton("8")}>8</div>
							<div className="calculator-button nine-button number-btn" onClick={() => this.inputButton("9")}>9</div>
							<div className="calculator-button multiply-button funct-btn" onClick={() => this.actionButton("*")}>X</div>

							<div className="calculator-button four-button number-btn" onClick={() => this.inputButton("4")}>4</div>
							<div className="calculator-button five-button number-btn" onClick={() => this.inputButton("5")}>5</div>
							<div className="calculator-button six-button number-btn" onClick={() => this.inputButton("6")}>6</div>
							<div className="calculator-button minus-button funct-btn" onClick={() => this.actionButton("-")}>-</div>

							<div className="calculator-button one-button number-btn" onClick={() => this.inputButton("1")}>1</div>
							<div className="calculator-button two-button number-btn" onClick={() => this.inputButton("2")}>2</div>
							<div className="calculator-button three-button number-btn" onClick={() => this.inputButton("3")}>3</div>
							<div className="calculator-button plus-button funct-btn" onClick={() => this.actionButton("+")}>+</div>

							<div className="calculator-button zero-button number-btn" onClick={() => this.inputButton("0")}>0</div>
							<div className="calculator-button point-button number-btn" onClick={() => this.inputButton(".")}>.</div>
							<div className="calculator-button equal-button funct-btn" onClick={this.equalButton}>=</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
