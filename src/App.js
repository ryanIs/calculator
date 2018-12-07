/**
 * App.js
 * 
 * Created by Ryan Isler
 * This project was bootstrapped with create-react-app
 */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    /**
     * Handles App init.
     * @param {object} props - object props
     */
    constructor(props) {

        // Call parent class constructor
        super(props);

        // Maximum output length
        this.MAX_OUTPUT_LENGTH = 20;

        // Resize text after these number of characters
        this.RESIZE_OUTPUT_LENGTH = 10;

        // Style of smaller output text
        this.OUTPUT_SMALL_TEXT_STYLE = {
            fontSize: "1em",
            paddingTop: 50,
            height: 50,
        }

        // Set inital state
        this.state = {
            output: "0",
            storedOutput: null,
            operator: null,
            outputStyle: {}
        };
    }

    /**
     * Sets the output of the string. Handles comma seperation.
     * 
     * @param {string} output - output of the string
     */
    setOutput(output) {
        let outputParts = output.split(".");

        outputParts[0] = parseInt(outputParts[0]).toLocaleString();

        if(outputParts[1] != null) {

            if(outputParts[1].length > 8)  {
                let eightSigFigs = parseFloat("0." + outputParts[1]).toFixed(8);

                outputParts[1] = eightSigFigs.toString().split(".")[1];
            }

        }

        return outputParts.join(".");
    }

    /**
     * Gets the output from state. Handles commas.
     */
    getOutput() {
        let input = this.state.output;

        let inputParts = input.split(",");

        let inputNoCommas = inputParts.join("");

        return inputNoCommas;
    }

    /**
     * Handles text-resizing after MAX_OUTPUT_LENGTH character size.
     */
    handleOutputTextSize() {

        if(this.state.output.length > this.RESIZE_OUTPUT_LENGTH) {
            if(Object.keys(this.state.outputStyle).length < 1) {
                this.setState({
                    outputStyle: this.OUTPUT_SMALL_TEXT_STYLE
                });
            }
        }

        else {
            if(this.state.outputStyle.length > 1) {
                this.setState({
                    outputStyle: {}
                });
            }
        }

    }

    /**
     * Runs after the state has been updated.
     */
    componentDidUpdate() {

        // Changes text-size based on output length
        this.handleOutputTextSize();
    }

    /**
     * Clear the output and reset all internal variables.
     */
    resetCalculatorState() {
        this.setState({
            output: "0",
            storedOutput: null,
            operator: null
        })
    }

    /**
     * Appends a character to the output.
     * 
     * @param input {String} - The input to be appended.
     */
    inputButton  = (input) => {

        let myOutput = this.getOutput();
        let newValue = myOutput + input;

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
            output: this.setOutput(newValue)
        });
    }

    /**
     * Clears calculator state
     */
    clearButton  = () => {
        this.resetCalculatorState();
    }

    /**
     * Clicking on the +, -, *, /, % or +/- buttons
     * 
     * @param action {String} - Action button ID.
     * 
     */
    actionButton  = (action) => {
        var oldOutput = this.getOutput(this.state.output);

        this.setState({
            storedOutput: oldOutput,
            output: "0",
            operator: action,
            equalHitLast: false
        });
    }

    /**
     * Actions which only modify the content currently in the output.
     * 
     * @param outputChanger {String} - change action.
     * 
     */
    changeButton = (outputChanger) => {

        // Negate turns the current output negative
        if(outputChanger == "negate") {
            this.setState({
                output: this.setState( (parseInt( this.getOutput() ) * -1).toString() )
            })
        }

        // Percent changes the current output to equal [output %] of the stored output
        else if(outputChanger == "percent") {
            if(this.state.storedOutput != null) {

                let numOutput = parseFloat( this.getOutput() ),
                    numStoredOutput = parseFloat(this.state.storedOutput);

                let calculatedResult = ((numOutput * 0.01) * numStoredOutput)

                this.setState({
                    output: this.setOutput( calculatedResult.toString() )
                })

            } else {
                this.resetCalculatorState();
            }
        }
    }

    /**
     * Calculate the outcome based on stored input variables.
     */
    equalButton = () => {
        let calculatedValue = 0;

        // Calculation
        if(this.state.storedOutput != null && this.state.operator != null) {
            if(this.state.operator == "+") {
                calculatedValue = parseFloat(this.state.storedOutput) + parseFloat(this.getOutput());
            } else if(this.state.operator == "-") {
                calculatedValue = parseFloat(this.state.storedOutput) - parseFloat(this.getOutput());
            } else if(this.state.operator == "*") {
                calculatedValue = parseFloat(this.state.storedOutput) * parseFloat(this.getOutput());
            } else if(this.state.operator == "/") {
                calculatedValue = parseFloat(this.state.storedOutput) / parseFloat(this.getOutput());
            } 
        }

        // Update state
        this.setState({
            output: this.setOutput( calculatedValue.toString() ),
            operator: null,
            equalHitLast: true
        })
    }

    /**
     * Render the view.
     */
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
                        <div className="calculator-output" style={this.state.outputStyle}>
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
