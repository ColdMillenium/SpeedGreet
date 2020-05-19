import React, {Component} from 'react';
import Calculator from './components/Calculator/calculator';
import Chat from './components/Chat/Chat';
import SignIn from './components/SignIn/SignIn'
import Button from '@material-ui/core/Button';
import ClientContextProvider from './contexts/ClientContext'
import logo from './logo.svg';
import './App.css';
import MainMenuPage from './components/MainMenuPage/MainMenuPage';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
        showing: "CHAT"
    }
  }
  
  render() {
    return (
      <ClientContextProvider>
        <SignIn></SignIn>
        <MainMenuPage></MainMenuPage>
        
      </ClientContextProvider>
      
    )
  }
  changeDisplay = val => {
    let newState = {...this.state};
    if(val === "CALC" || val === "CHAT" || val === "SETTINGS"){
      newState = {...newState, showing: val}
    }
    this.setState(newState);
    return newState;
    

    
}
  display(){
    if(this.state.showing === "CALC"){
      return this.calcDisplay();
    }else if(this.state.showing === "CHAT"){
      return this.homeDisplay();
    }else{
      return this.settingDisplay();
    }
   
  }

  menuButton(val){
    return <Button onClick={() => this.changeDisplay(val)} variant="contained" color="primary">
    {val}
  </Button>
  }
  calcDisplay() {
      return <div>
        {this.menuButton("CHAT")}
        {this.menuButton("SETTINGS")}
        <Calculator />
      </div>;
  }
  homeDisplay(){
    return <div>
      {this.menuButton("CHAT")}
      {this.menuButton("SETTINGS")}
      {/* <Chat></Chat> */}
      <SignIn></SignIn>
      
      </div>;
  }
  settingDisplay(){
    return <div>
      {this.menuButton("CHAT")}
      {this.menuButton("CALC")}
      
      
      </div>;
  }
}
  
   
  

