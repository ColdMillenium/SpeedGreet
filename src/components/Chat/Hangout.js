import React, {useEffect, useState, useRef, createRef, useContext} from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles, useTheme} from '@material-ui/core/styles'
import './Chat.css'
import {ClientContext} from '../../contexts/ClientContext'
import Header from '../Header/Header'
import OnlineUsers from './OnlineUsers';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme)=>({
    hangout: {
      background: theme.colors.dark,
      color:theme.colors.light,
    },
    videoChatContainer: {
        padding: 0,
        postion: "relative",
        margin: 0,
        width: "100%",
        height: "100%"
    },
    talkInfo:{
        
    },
    remoteVideo:{
        objectFit:"fill"
    },
    localVideo:{
        position: "absolute",
        border: "1px solid " + theme.colors.accent,
        bottom: 0,
        right: 0,
        borderRadius: 5,
        width: 300,
        boxShadow: "0 3 6 rgba(0, 0, 0, 0.2)"
    },
    contentContainer: {
        width: '100%',
        height: "auto",
        display: "flex",
        overflow: "hidden",
      }
  }));
export default function Chat() {
    const theme = useTheme();
    const classes = useStyles();
    const {
        userName, 
        users,
        receivingCall,
        caller,
        callAccepted,
        callPeer,
        acceptCall,
        userStream,
        partnerStream,
    } = useContext(ClientContext);

    const userVideoRef = useRef();
    const partnerVideoRef = useRef();

    
    let userVideoWindow;
    if ( callAccepted ) {
        if(userVideoRef.current){
            userVideoRef.current.srcObject = userStream;
        }
        console.log("userVieoRef" + userVideoRef);
        userVideoWindow = (
            <video ref={userVideoRef} autoPlay muted className={classes.localVideo} id="local-video"></video>
        );
    }
    
    let partnerVideoWindow;
    if (callAccepted ) {
        if(partnerVideoRef.current){
            console.log("partner REF IS HERE!")
            partnerVideoRef.current.srcObject = partnerStream;
        } 
        console.log("showing partner stream");
        partnerVideoWindow = (
            <div>
                <Toolbar/>
                <Toolbar/>
                <video ref={partnerVideoRef} autoPlay className={classes.remoteVideo} id="remote-video"></video>
            </div>
        );
    }
    
    let incomingCall;
    if (receivingCall && !callAccepted) {
        incomingCall = (
        <div>
            <h1>{users[caller]}:{caller} is calling you</h1>
            <button onClick={acceptCall}>Accept</button>
        </div>
        )
    }
    let notification = () =>{
        console.log("wtf dude "+ callAccepted);
        if(!callAccepted){
            return (
                <div>
                    <Toolbar/>
                    <Toolbar/>
                    <h5 variant="h5" className={classes.talkInfo} > 
                        Welcome {userName}!
                    </h5>
                    <h6 variant="h6" className={classes.talkInfo} > 
                        {incomingCall}
                    </h6>
                </div>
            )
        }
    }
    return (
            <div>
                <div className={classes.hangout}>
                    <Header></Header>
                    <div className={classes.contentContainer}>
                        <OnlineUsers users={users} callPeer={callPeer}></OnlineUsers>
                        {notification()}
                        <div className={classes.videoChatContainer}>
                            
                            {partnerVideoWindow}
                            {userVideoWindow}
                        </div>
                    </div>
                </div>
            </div>
               
            
    )
}
