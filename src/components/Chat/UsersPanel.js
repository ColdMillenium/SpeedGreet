import React, {useEffect, useState, useRef, createRef, useContext} from 'react';
import Button from '@material-ui/core/Button'
import './Chat.css'
import {ClientContext} from '../../contexts/ClientContext'
import UserSearch from './UserSearch.js'
import Header from '../Header/Header'
// import OnlineUsers from './OnlineUsers';

import styled ,{ withTheme} from 'styled-components';

import randoDice from '../../assets/RandoDice.png';
import userIcon from '../../assets/userIcon.svg';







export function UsersPanel(props) {
    const {
        userStream,
        joinRandoCall,
        isInRandoCall,
        skipRandoCall,
        leaveRandoCall
    } = useContext(ClientContext);


   
    const userVideoRef = useRef();

  
    if(userVideoRef.current){
        if(userStream!=null){
            console.log("new video stream!")
            userVideoRef.current.srcObject = userStream;
        }else{
            console.log("yeah its not here guys");
        }
    }
    let userVideoWindow;
        if(isInRandoCall){
            userVideoWindow = (
                <div>
                    <button onClick={(e)=> {leaveRandoCall()}}>Exit Rando Calls</button>
                    <button onClick={(e)=> skipRandoCall()}>Skip this call</button>
                    <LocalVideo ref={userVideoRef} autoPlay muted id="local-video"></LocalVideo>
                </div>
                
            )
        }
        
    
    let randoCallBtn;

    if(!isInRandoCall){
        randoCallBtn = (
            <RandoCall onClick={(e)=>{joinRandoCall()}}>
            <div className="rando-header">Rando Call</div>
            <img src={randoDice} className="rando-btn"></img>
            </RandoCall>)
    }
    
    
    
    
   
    return (
        
            <UsersPanelContainer>
                <UserSearch></UserSearch>
                <Divider></Divider>
                 {randoCallBtn}
                {userVideoWindow}
            </UsersPanelContainer>
    )
}

export default UsersPanel;

const UsersPanelContainer = styled.div`
    background:linear-gradient(180deg, rgba(46, 117, 105, 0.7) 0%, rgba(7, 39, 58, 0.7) 100%);


    /* background-color: blue; */
    /* background-color: linear-gradient(180deg, rgba(46, 117, 105, 0.7) 0%, rgba(7, 39, 58, 0.7) 100%); */
    min-width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    filter: drop-shadow(4px 0px 10px rgba(0, 0, 0, 0.25));

`;

const Divider = styled.div`
    height: 1px;
    background-color: #929292;
    width: 100%;
`;
const RandoCall = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    .rando-header{
        font-size: 32px;
        font-family: 'Montserrat';
        font-weight: bold;
      
    }
`;

const LocalVideo = styled.video`
    border: 1px red;
    width: 100%;
   ;
    border-radius: 5px;
    width: 300px;
    box-shadow: 0 3 6 rgba(0, 0, 0, 0.2);
`;


