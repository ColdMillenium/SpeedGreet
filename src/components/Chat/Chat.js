import React, {useEffect, useState, useRef, createRef, useContext} from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './Chat.css'
import {ClientContext} from '../../contexts/ClientContext'



export default function Chat() {
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
