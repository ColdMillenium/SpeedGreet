import React, {Component} from 'react';
import Calculator from './components/Calculator/calculator';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
        showing: "CALC"
    }
  }
  
  render() {
    return (
      this.display()
    )
  }
  changeDisplay = val => {
    let newState = {...this.state};
    if(val === "CALC" || val === "HOME" || val === "SETTINGS"){
      newState = {...newState, showing: val}
    }
    this.setState(newState);
    return newState;
    

    
}
  display(){
    if(this.state.showing === "CALC"){
      return this.calcDisplay();
    }else if(this.state.showing == "HOME"){
      return this.homeDisplay();
    }else{
      return this.settingDisplay();
    }
   
  }
  homeButton(){
    
  }
  menuButton(val){
    return <Button onClick={() => this.changeDisplay(val)} variant="contained" color="primary">
    {val}
  </Button>
  }
  calcDisplay() {
      return <div>
        {this.menuButton("HOME")}
        {this.menuButton("SETTINGS")}
        <Calculator />
      </div>;
  }
  homeDisplay(){
    return <div>
      {this.menuButton("CALC")}
      {this.menuButton("SETTINGS")}
      <h1>HOME</h1>
      </div>;
  }
  settingDisplay(){
    return <div>
      {this.menuButton("HOME")}
      {this.menuButton("CALC")}
      <h1>SETTINGS</h1>
      
      </div>;
  }
}
  
   
  

