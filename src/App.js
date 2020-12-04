import React, {Component, useContext} from 'react';
import Calculator from './components/Calculator/calculator';
import Chat from './components/Chat/Chat';
import SignIn from './components/SignIn/SignIn'
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import './App.css';
import MainMenuPage from './components/MainMenuPage/MainMenuPage';
import { Switch, Route, Redirect } from 'react-router-dom';
import {ClientContext} from './contexts/ClientContext'


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
          <Route exact path="/Train">{()=>{
            if(hasUserName){
              return <Chat></Chat>
            }else{
              return <SignIn></SignIn>
            }
          }}
          </Route>
          <Route exact path="/Hangout">{()=>{
            if(hasUserName){
              return <div>Hangout</div>
            }else{
              return <SignIn></SignIn>
            }
          }}
          </Route> 
          <Route exact path="/Date">{()=>{
            if(hasUserName){
              return <div>Date</div>
            }else{
              return <SignIn></SignIn>
            }
          }}
          </Route>
          <Route exact path="/Profile">{()=>{
            if(hasUserName){
              return <div>Profile</div>
            }else{
              return <SignIn></SignIn>
            }
          }}
          </Route>
          <Route exact path="/Settings">{()=>{
            if(hasUserName){
              return <div>Settings</div>
            }else{
              return <SignIn></SignIn>
            }
          }}
          </Route>
      </Switch>
 
      
    );
  

}
  
   
  

