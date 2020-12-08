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
import Typography from "@material-ui/core/Typography";



export default function Chat() {
    const theme = useTheme();
    const useStyles = makeStyles({
        hangout: {
          background: theme.colors.dark,
          color:theme.colors.light,
        },
      });
    
    const classes = useStyles();
    const {
        hasUserName,
        userName, 
        yourID, 
        users,
        receivingCall,
        callUser,
        onPartnerAcceptsCall,
        notifyAcceptCall,
        callerSignal,
        caller,
        callAccepted,
        setCallAccepted,
    } = useContext(ClientContext);

  
    
    const [stream, setStream] = useState();
    const [userNameRef, setUserNameRef] = useState();
    

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();
    const nameRef = createRef();
    
    
   
    function callPeer(partnerId) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(newStream => {
            setStream(newStream);
            if (userVideo.current) {
              userVideo.current.srcObject = newStream;
            }

            //Since you are the initiator. the Signal will start from you, not from the parter.
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: newStream,
            });
            
            //If peer is the initiator (in this case it is), it emit a "signal"
            peer.on("signal", data => {
               //you're going to send over data and invite the other partner to call
               callUser({ userToCall: partnerId, signalData: data, from: yourID })
            })
            
            //when your partner is streaming, sets the video for the stream
            peer.on("stream", PartnerStream => {
                if (partnerVideo.current) {
                    partnerVideo.current.srcObject = PartnerStream;
                }
            });

            //When the partner accepts the call we need our peer to save the signal data.
            onPartnerAcceptsCall(peer);
        }).catch(function(error) {
            if (error.name === 'PermissionDeniedError') {
              console.log('Permissions have not been granted to use your camera and ' +
                'microphone, you need to allow the page access to your devices in ' +
                'order for the demo to work.');
            }
            console.log('getUserMedia error: ' + error.name);
          });
    }
    
    function acceptCall() {
       
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(newStream => {
            setStream(newStream);
            setCallAccepted(true);
            if (userVideo.current) {
              userVideo.current.srcObject = newStream;
            }
            console.log('accepted call bruh');
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: newStream,
            });
            peer.on("signal", data => {
                notifyAcceptCall({ signal: data, to: caller });
            })
            peer.on("stream", partnerStream => {
                console.log(partnerStream);
                partnerVideo.current.srcObject = partnerStream;
                console.log("got caller's stream!");
                
            });
        
            peer.signal(callerSignal);
        }).catch(function(error) {
            if (error.name === 'PermissionDeniedError') {
              console.log('Permissions have not been granted to use your camera and ' +
                'microphone, you need to allow the page access to your devices in ' +
                'order for the demo to work.');
            }
            console.log('getUserMedia error: ' + error.name);
          });
    }

    

    let UserVideo;
    if (stream != null) {
    UserVideo = (
        <video ref={userVideo} autoPlay muted className="local-video" id="local-video"></video>
    );
    }
    
    let PartnerVideo;
    if (callAccepted) {
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
 
   
   
    let pleaseSelectName;
    let videoChat;
    let activeUsers;
   
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
    
    return (
            <div>
                <div className={classes.hangout}>
                    <Header></Header>
                    <div className="content-container">
                        <OnlineUsers users={users} handleClick={callPeer}></OnlineUsers>
                        <div className="video-chat-container">
                            {pleaseSelectName}
                            {videoChat}
                        </div>
                    </div>
                </div>
            </div>
               
            
    )
}
