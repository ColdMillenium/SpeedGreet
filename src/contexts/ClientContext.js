import React, {createContext, useState, useRef, useEffect} from 'react'
import io from "socket.io-client";
import Peer from "simple-peer";
import { keyframes } from 'styled-components';

export const ClientContext = createContext();
export default function ClientContextProvider(props) {
    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [userStream, setUserStream] = useState(null);
    const [partnerStream, setPartnerStream] = useState(null);
    const [receivingCall, setReceivingCall] = useState(false);
    const [callerId, setCallerId] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [hasUserName, setHasUserName] = useState(false);
    const [userName, setUserName] = useState("userNAME");
    const [userNameRef, setUserNameRef] = useState();
    const [canUpdateName, setCanUpdateName] = useState(false);
    const [signInError, setSignInError] = useState("");

    const socket = useRef();
    useEffect(()=>{
        socket.current = io.connect("/");
        socket.current.on("yourID", (id) => {
            console.log("my id is : " + id)
            setYourID(id);
            
        })
        socket.current.on("allUsers", (users) => {
            setUsers(users);
        })
        socket.current.on("hey", (data) => {
            setReceivingCall(true);
            setCallerId(data.from);
            setCallerSignal(data.signal);
            //console.log("receiving call dawg");
        })
        socket.current.on("signInError", error =>{
            setSignInError(error);
        })
        socket.current.on("validUserName", name =>{
            setUserName(name);
            setHasUserName(true);
        })
        
    },[]);

    function callUser(data){
        //the data contains and id, which to whom the call is for
        // the data contains a id , which who the call is from.
        //the data send contains signalData, which tells other users how to contact them back using the peer.
        socket.current.emit("callUser", data);
    }
    function onPartnerAcceptsCall(peer){
        socket.current.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        })
    }
    

    function notifyAcceptCall(data){
        socket.current.emit("acceptCall", data)
    }
    function notifyLeftCall(){
        leaveCall();
        setCallAccepted(false);
        setUserStream(null);
        setPartnerStream(null);
        setReceivingCall(false);
        socket.current.emit("leftCall", {yourId: yourID, callerId: callerId});
    }
    function validateUserName(name){
        if(name.length < 3){
            setSignInError("userNameTooShort");
            return;
        }
        if(users[name]){
            for(let key in users){
                if(users[key] === name){
                    setSignInError("userNameTaken");
                    return;
                }
            }
        }
        socket.current.emit("yourUserName", name);
    }
    function callPeer(partnerId) {
        setCallerId(partnerId);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(newStream => {
            setUserStream(newStream);
            
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
            peer.on("stream", x => {
            // setPartnerStream(PartnerStream);
                console.log("Caller: getting partner's stream")
                setPartnerStream(x);
            });

            //When the partner accepts t    he call we need our peer to save the signal data.
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
            setUserStream(newStream);
            setCallAccepted(true);

            console.log('accepted call bruh');
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: newStream,
            });
            peer.on("signal", data => {
                notifyAcceptCall({ signal: data, to: callerId });
            })
            peer.on("stream", x => {
                console.log(partnerStream);
                setPartnerStream(x)
                console.log("Reciever: I've got caller's stream!");
                
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
    function stopStream(stream){
        stream.getTracks().forEach(function(track) {
            track.stop();
        });
    }
    function leaveCall(){
       stopStream(userStream);
       stopStream(partnerStream);
    }
    const value = {
        validateUserName,
        userName,
        hasUserName,
        partnerStream,
        users,
        yourID,
        receivingCall,
        callUser,
        onPartnerAcceptsCall,
        notifyAcceptCall,
        callerSignal,
        callerId,
        callAccepted,
        setCallAccepted,
        signInError,
        acceptCall,
        callPeer,
        userStream,
        notifyLeftCall
    }
    return (
        <ClientContext.Provider value ={value}>
            {props.children}
        </ClientContext.Provider>
    )
}

