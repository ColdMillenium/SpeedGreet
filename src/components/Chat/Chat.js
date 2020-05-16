import React, {useEffect, useState, useRef} from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";
import Button from '@material-ui/core/Button'
import './Chat.css'

export default function Chat() {
    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    //const [isStreaming, setIsStreaming] = useState(false);
    const userName = "user" + Math.floor((Math.random() * 100) + 1);

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();
    
    useEffect(()=>{
        socket.current = io.connect("/");
        if(callAccepted){
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
              userVideo.current.srcObject = stream;
            }
            console.log('bruh');
        })
        }
        socket.current.on("yourID", (id) => {
            setYourID(id);
            socket.current.emit("yourUserName", userName);
        })
        socket.current.on("allUsers", (users) => {
            setUsers(users);
        })
        socket.current.on("hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
            console.log("receiving call dawg");
        })
        
    },[]);
    function callPeer(id) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(newStream => {
            setStream(newStream);
            if (userVideo.current) {
              userVideo.current.srcObject = newStream;
            }
            console.log("calling someone bruh");
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: newStream,
            });
            
            peer.on("signal", data => {
                console.log(id);
                socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
            })
        
            peer.on("stream", PartnerStream => {
                if (partnerVideo.current) {
                    partnerVideo.current.srcObject = PartnerStream;
                    console.log("got receipient's stream!");
                }
            });
        
            socket.current.on("callAccepted", signal => {
                setCallAccepted(true);
                peer.signal(signal);
            })
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
                socket.current.emit("acceptCall", { signal: data, to: caller })
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
                        
                            {Object.keys(users).map(key => {
                                if (key === yourID) {
                                    return null;
                                }
                                return (

                                    <button key={key} className="user" onClick={() => callPeer(key)}>Call {users[key]}</button>
                                );
                            })}
                       
                       
                        {/* {this.streamButton()} */}
                    </div>
                    <div className="video-chat-container">
                        <h2 className="talk-info" id="talking-with-info"> 
                        {userName}: Select active user on the left menu.
                        {incomingCall}
                        </h2>
                        <div className="video-container">
                            {PartnerVideo}
                            {UserVideo}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
               
            
    )
}
