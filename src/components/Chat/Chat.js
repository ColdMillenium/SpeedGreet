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
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme)=>({
    hangout: {
      background: theme.colors.dark,
      color:theme.colors.light,
    },
    videoChatContainer: {
        padding: 0,
        flex: 1,
        postion: "relative"
    },
    talkInfo:{
        
    },
    remoteVideo:{
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
        height: "calc(100vh - 89px)",
        display: "flex",
        justifyContent: "space-between",
        overflow: "hidden",
      }
  }));
export default function Chat() {
    const theme = useTheme();
    
    //   .video-chat-container {
    //     padding: 0 20px;
    //     flex: 1;
    //     position: relative;
    //   }
      
    //   .talk-info {
    //     font-weight: 500;
    //     font-size: 21px;
    //   }
      
    //   .remote-video {
    //     border: 1px solid #cddfe7;
    //     width: 100%;
    //     height: 100%;
    //     box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    //   }
      
    //   .local-video {
    //     position: absolute;
    //     border: 1px solid #cddfe7;
    //     bottom: 60px;
    //     right: 40px;
    //     box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    //     border-radius: 5px;
    //     width: 300px;
    //   }
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
        <video ref={userVideo} autoPlay muted className={classes.localVideo} id="local-video"></video>
    );
    }
    
    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = (
            <video ref={partnerVideo}autoPlay className={classes.remoteVideo} id="remote-video"></video>
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
    let notification = () =>{
        console.log("wtf dude "+ callAccepted);
        if(!callAccepted){
            return (
                <div>
                    <Toolbar/>
                    <Toolbar/>
                    <Typography variant="h5" className={classes.talkInfo} > 
                        Welcome {userName}!
                    </Typography>
                    <Typography variant="h6" className={classes.talkInfo} > 
                        {incomingCall}
                    </Typography>
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
                            
                            {PartnerVideo}
                            {UserVideo}
                        </div>
                    </div>
                </div>
            </div>
               
            
    )
}
