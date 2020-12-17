import React, {Component, useContext, Fragment} from 'react';
import Calculator from './components/Calculator/calculator';
import Chat from './components/Chat/Chat';
import Train from './components/Chat/Train';
import Loading from './components/Chat/Loading';
import SignIn from './components/SignIn/SignIn'
import Button from '@material-ui/core/Button';
import logo from './logo.svg';

import MainMenuPage from './components/MainMenuPage/MainMenuPage';
import { Switch, Route, Redirect } from 'react-router-dom';
import {ClientContext} from './contexts/ClientContext'
import { createMuiTheme, makeStyles, withTheme } from '@material-ui/core/styles';
import {ThemeProvider, createGlobalStyle} from 'styled-components';

// const theme = createMuiTheme({
//   colors: {
//     light: 'white',
//     mid: '#a9abb3',
//     dark: '#272c34',
//     accent: "#a6e22e",
//   },
// });
const theme = {
  colors: {
    light: 'white',
    mid: '#a9abb3',
    dark: '#272c34',
    accent: "#a6e22e",
    error: '#ea666e',
  },
  bs: `0.25em 0.25em 0.75em rgba(0,0,0,.25),
  0.125em 0.125em 0.25em rgba(0,0,0,.15)`
}

const GlobalStyle = createGlobalStyle`

  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    background-color: ${theme.colors.dark};
    color: ${theme.colors.light};
    height: 100vh;
    width: 100vw;
    overflow:hidden;
  }
  p{
    font-family: 'Quicksand', sans-serif;
  }
  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.mid} ${theme.colors.dark};
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: ${theme.colors.dark};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.mid};
    border-radius: 20px;
    border: 3px solid ${theme.colors.dark};
  }
`;

    
    
export default function App(){
  const {confirmUserName, hasUserName} = useContext(ClientContext);
  

    return (
    <Fragment>
      <GlobalStyle/>
      <ThemeProvider theme={theme}>
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
                return <Train></Train>
              }else{
                return <SignIn></SignIn>
              }
            }}
            </Route>
            <Route exact path="/Hangout">{()=>{
              if(hasUserName){
                return <Loading></Loading>
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
      </ThemeProvider>
    </Fragment>  
    );
  

}
  
   
  

