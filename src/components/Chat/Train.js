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
import IncomingCall from '../IncomingCall/IncomingCall';
import styled ,{ withTheme, keyframes} from 'styled-components';


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
        objectFit:"fill",
        width: "100%",
        height: "100%",
        margin: 0,
        madding:0,
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

const videoChatContainer = styled.div`
    padding: 0px;
    position: relative;
    margin: 0px;
    width: 100%;
    height: 100%;
`;
const remoteVideo = styled.div`
    object-fit: fill;
    width: 100%;
    height: 100%;
    margin: 0px;
`;
const localVideo = styled.div`
    position: absolute;
    border: 1px solid ${props => props.theme.colors.accent};
    bottom: 0px;
    right: 0px;
    border-radius: 5px;
    width: 300px;
    box-shadow: 0 3 6 rgba(0, 0, 0, 0.2);
`;
const contentContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    overflow: hidden;
`;
export function Train() {
    const classes = useStyles();
    const {
        userName, 
        users,
        receivingCall,
        callerId,
        callAccepted,
        callPeer,
        acceptCall,
        userStream,
        partnerStream,
        notifyLeftCall,
        leaveCall,
        callEnding
    } = useContext(ClientContext);

    const userVideoRef = useRef();
    const partnerVideoRef = useRef();
    const caller = users[callerId];
    
    let userVideoWindow;
    if(callEnding){
        leaveCall();
    }
    if ( callAccepted ) {
        if(userVideoRef.current){
            userVideoRef.current.srcObject = userStream;
        }
        console.log("userVieoRef" + userVideoRef);
        userVideoWindow = (
            <div>
                <video ref={userVideoRef} autoPlay muted className={classes.localVideo} id="local-video"></video>
                <Button onClick={()=>{notifyLeftCall()}}variant="contained" color="secondary">
                    Leave Call with {caller}
                </Button>
            </div>
            
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
            <h1>{caller} is calling you</h1>
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
          
            <div className={classes.hangout}>
                <Header></Header>
                <div className={classes.contentContainer}>
                    <OnlineUsers users={users} callPeer={callPeer}></OnlineUsers>
                    <div className="chatArea">
                        {/* {notification()} */}
                        <IncomingCall></IncomingCall>
                        <div className={classes.videoChatContainer}>
                            
                            {partnerVideoWindow}
                            {userVideoWindow}
                            
                        </div>
                    </div>
                </div>
            </div>
        
               
            
    )
}

export default withTheme(Train);