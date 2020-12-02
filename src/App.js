import React, {Component} from 'react';
import Calculator from './components/Calculator/calculator';
import Chat from './components/Chat/Chat';
import SignIn from './components/SignIn/SignIn'
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import './App.css';
import MainMenuPage from './components/MainMenuPage/MainMenuPage';
import { Switch, Route, Redirect } from 'react-router-dom';


export default function App(){
  const {confirmUserName, hasUserName} = useContext(ClientContext);
  

    return (
     
      <Switch>
          <Route exact path="/">{ ()=>{
            if(hasUserName){
              return<MainMenuPage></MainMenuPage>
            }else{
              return <SignIn></SignIn>
            }
          }}
          </Route>
          <Route exact path="/SignIn" component={SignIn}/>
          <Route exact path="/MainMenu">{()=>{
            if(hasUserName){
              return<MainMenuPage></MainMenuPage>
            }else{
              return <SignIn></SignIn>
            }
          }} 
          </Route>
      </Switch>
 
      
    );
  

}
  
   
  

