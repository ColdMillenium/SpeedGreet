import React from 'react';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import Button from './Button.js';
import './Calculator.css';
import CalcInput from './CalcInput.js';
import ClearButton from './ClearButton.js';

export default class Calculator extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            input: "",
            previousNumber: "",
            currentNumber: "",
            operator: "",
            isError: false,
            isResult: false
        }
    }

    addToInput = val => {
        let newState = {...this.state}
        if(newState.isError){
            return newState;
        }
        if(newState.isResult){
            newState = {...this.state, input: val, isResult:false};
        }else{
            newState = {...this.state, input: this.state.input + val };
        }
        
        this.setState(newState);
        return newState;
    }
    addDecimal = val => {
        //only add decimal if there is no other decimal point in the input
        let newState = {...this.state}
    
        if(newState.input.indexOf(".") === -1){
           newState = this.addToInput(val)
           this.setState(newState);
        }
        return newState;
        
    }
    clearInput = val => {
        let newState = {
            ...this.state,
            input: "",
            previousNumber: "",
            operator: "",
            currentNumber: "",
            isError: false
         };
        this.setState(newState);
        return newState;
    }
    addZeroToInput = val => {
        let newState = {...this.state}
        //only adds zero if empty
        if((newState.input !== ""  && newState.input != "0") 
        || (newState.input === "" && newState.operator != "" && newState.input != "0")){
            newState = this.addToInput(val)
            this.setState(newState);
        }
        return newState;
    }
    operator = (val) => {
        let newState = {...this.state}
        if(newState.isError){
            return newState;
        }
        //if everything is empty let's not add any operators
        if(newState.op == "" && newState.input == "" && newState.previousNumber == ""){
            return newState;
        }
        // reformats something like 5+5+ => 10, then adds the operator below
        if(newState.op != "" && newState.input != "" && newState.previousNumber != ""){
            newState = this.evaluate();
        }
        //if you already pressed an operator but didnt combine it with anything let's remove it so it can be replaced.
        if(newState.op != "" && newState.input == ""){
            newState = {...newState, 
                operator:"",
                input: newState.previousNumber,
                previousNumber: ""
            };
        }
       
        //add operator that was pressed
        newState = {...newState, 
            previousNumber : newState.input, 
            input:"", 
            operator:val
        }
        this.setState(newState);
        return newState;
    }
       
        
    
    add = () => {
        return this.operator("+");
    }
    minus = () =>{
        return this.operator("-");
    }
    divide = () => {
        return this.operator("/");
    }
    multiply = () => {
        return this.operator("*");
    }

    evaluate = () => {
        let newState = {...this.state};
        let op = newState.operator;
        let prev = parseFloat(newState.previousNumber);
        let curr = parseFloat(newState.input);
        if(op === '+'){
            newState = {...newState, 
                input: prev + curr + "",
            };
        }else if(op === '-'){
            newState = {...newState, 
                input: prev - curr + "",
            };
        }else if (op === '/'){
            if(curr == 0){
                newState = {...newState,
                    input: "err:divByZero",
                    isError: true
                } 
            }else{
                newState = {...newState,
                    input: prev / curr + "",
                }    
            }
        }else if (op === '*'){
            newState = {...newState,
                input: prev * curr + "",
            }  
        }
        newState = {
            ...newState,
            previousNumber: "",
            operator: "",
            currentNumber: "",
            isResult: true
         };
        this.setState(newState);
        return newState;
    }
    render(){
        return (
            <div className= "Calculator">
                <div className="calc-wrapper">
                    <div className="row">
                        <CalcInput>
                            {this.state.previousNumber}{this.state.operator}{this.state.input}</CalcInput>
                    </div>
                    <div className="row">
                        <Button handleClick={this.addToInput} variant="contained" color="primary">7</Button>
                        <Button handleClick={this.addToInput} variant="contained" color="primary">8</Button>
                        <Button handleClick={this.addToInput} variant="contained" color="primary">9</Button>
                        <Button handleClick={this.divide} variant="contained" color="primary">/</Button>
                   </div>
                   <div className="row">
                        <Button handleClick={this.addToInput} variant="contained" color="primary">4</Button>
                        <Button handleClick={this.addToInput} variant="contained" color="primary">5</Button>
                        <Button handleClick={this.addToInput} variant="contained" color="primary">6</Button>
                        <Button handleClick={this.multiply}variant="contained" color="primary">*</Button>
                   </div>
                   <div className="row">
                        <Button handleClick={this.addToInput} variant="contained" color="primary">1</Button>
                        <Button handleClick={this.addToInput} variant="contained" color="primary">2</Button>
                        <Button handleClick={this.addToInput} variant="contained" color="primary">3</Button>
                        <Button handleClick={this.add} variant="contained" color="primary">+</Button>
                   </div>
                    <div className="row">
                        <Button handleClick={this.addDecimal} variant="contained" color="primary">.</Button>
                        <Button handleClick={this.addZeroToInput} variant="contained" color="primary">0</Button>
                        <Button handleClick={this.evaluate} variant="contained" color="primary">=</Button>
                        <Button handleClick={this.minus}variant="contained" color="primary">-</Button>
                    </div>
                    <div className="row">
                        <ClearButton handleClear={this.clearInput}>Clear</ClearButton>
                    </div>
                </div>
                   

            </div>
        );
    }

}


