import React, {useEffect, useState, useRef, createRef, useContext} from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './Chat.css'
import { ClientContext } from '../../contexts/ClientContext';

export default function Chat() {
    const {
        stream, 
        partnerStream, 
        callAccepted, 
        receivingCall, 
        users, 
        userName,
        callPeer,
        acceptCall,
    } = useContext(ClientContext);
    const userVideoRef = useRef();
    const partnerVideoRef = useRef();

    let UserVideo;
    if (stream != null) {
        if(userVideoRef.current != null){
            userVideoRef.current.srcObject = stream;
        }
        UserVideo = (
            <video ref={userVideo} autoPlay muted className="local-video" id="local-video"></video>
        );
    }
    
    let PartnerVideo;
    if (callAccepted) {
        if(partnerVideo.current)
        PartnerVideo = (
            <video ref={partnerVideo}autoPlay className="remote-video" id="remote-video"></video>
        );
    }
    
    let incomingCall;
    if (receivingCall && !callAccepted) {
        incomingCall = (
        <div>
            <h1>{users[caller]}:{caller} is calling you</h1>
            <button onClick={() => acceptCall()}>Accept</button>
        </div>
        )
    }
    function updateName(e){
        if(nameRef.current!=null){
            nameRef.current.value = nameRef.current.value.split(' ').join('');
            setUserName(nameRef.current.value);
            //console.log(nameRef.current.value);
        }
    }
    function signInEnter(e){
        if(e.keyCode === 13){
            commitUserName();
        }
    }
    function commitUserName(){
        if(userName.length > 3){
            setHasUserName(true);
            socket.current.emit("yourUserName", userName);
        }
    }
    let pleaseSelectName;
    let videoChat;
    let activeUsers;
    if(!hasUserName){
        pleaseSelectName = (
            <div>
                <p>Please Sign In:</p>
                <TextField inputRef={nameRef} onChange={(e) => updateName()} onKeyDown={(e) => signInEnter(e)}id="outlined-basic" label="User Name" variant="outlined" />
                <Button onClick={() => commitUserName()} variant="contained" color="primary">SignIn</Button>
   
            </div>
        )
    }else{
        videoChat = (
            <div>
                <h2 className="talk-info" id="talking-with-info"> 
                    {userName}: Select active user on the left menu.
                    {incomingCall}
                </h2>
                <div className="video-container">
                    {PartnerVideo}
                    {UserVideo}
                </div>
            </div>
        );
        activeUsers = (
            <div>
                {Object.keys(users).map(key => {
                    if (key === yourID) {
                        return null;
                    }
                    return (

                        <button key={key} className="user" onClick={() => callPeer(key)}>Call {users[key]}</button>
                    );
                })}
            </div>
        )
    }
    
    return (
            <div>
                <div className="container">
                    <header className="header">
                    <div className="logo-container">
                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fb9cc1fd-4970-4659-b67c-e1628299afb8/dax8ad0-f7c9770d-d388-4d0f-85e9-19d48666749b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZmI5Y2MxZmQtNDk3MC00NjU5LWI2N2MtZTE2MjgyOTlhZmI4XC9kYXg4YWQwLWY3Yzk3NzBkLWQzODgtNGQwZi04NWU5LTE5ZDQ4NjY2NzQ5Yi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.OC10dwE38B2UzZ42-53dMcFbe21_iHAhyaDH3rmh9zE" alt="doge logo" className="logo-img" />
                        <h1 className="logo-text">
                        Meet<span className="logo-highlight">&</span>Greet 
                        </h1>
                        <img src="https://www.freepnglogos.com/uploads/anime-face-png/bloodnhonor-photos-tumview-19.png" alt="doge logo" className="logo-img" />
                    </div>
                    </header>
                    <div className="content-container">
                    <div className="active-users-panel" id="active-user-container">
                        <h3 className="panel-title">Active Users:</h3>
                        {activeUsers}
                    </div>
                    <div className="video-chat-container">
                        {pleaseSelectName}
                        {videoChat}
                    </div>
                    </div>
                </div>
            </div>
               
            
    )
}
