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
    const [callEnding, setCallEnding] = useState(false);
    const [msgHistory, setMsgHistory] = useState({});
    const [chatUser, setChatUser] = useState('');

    const socket = useRef();
    useEffect(()=>{
        socket.current = io("http://localhost:5000"), {
        // socket.current = io("https://meet-and-greet.herokuapp.com/", {
            reconnectionDelayMax: 10000,
            query: {
              auth: "123"
            }
          });
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
        socket.current.on("callerLeftCall", id =>{
            console.log(id + "leftcall");
            setCallEnding(true);
        })
        socket.current.on("serverSentMessage", data =>{
            const history = {...msgHistory}
            let user = data.users[1]; // your partner in chat. One of the users is 'you'
            if(data.users[0] != yourID){
                user = data.users[0];
            }
            //if we've been talking to the user and have a history 
            // just update the messages
            if(history[user] && history[user].msgHistoryId === data.msgHistoryId){
                history[user].messages = data.messages
                history[user].unread+=1;
            }else{
                history[user] = {
                    messages: data.messages,
                    msgHistoryId: data.msgHistoryId,
                    unread :1,
                }
            }
            setMsgHistory(history);
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
        // leaveCall();
        socket.current.emit("leftCall", {userGone: yourID, userPresent: callerId});
        setCallEnding(true);
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
    function sendMessage(msg, recipientId){
        let msgHistoryId = null;
        if(!msgHistory[recipientId]){
           msgHistoryId = msgHistory[recipientId].msgHistoryId;
        }
        socket.current.emit("clientSentMsg", {
            msg: msg,
            time: new Date().getTime(),
            msgHistoryId: msgHistoryId,
            to: recipientId,
            from: yourID
        });
    }
    // function removeMessages(NewUsers){
    //     for
    // }
    function callPeer(partnerId) {
        setCallerId(partnerId);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(newStream => {
            setUserStream(newStream);
            
            //Since you are the initiator. the Signal will start from you, not from the parter.
            const peer = new Peer({
                initiator: true,
                config: { iceServers: [{"url":"stun:global.stun.twilio.com:3478?transport=udp","urls":"stun:global.stun.twilio.com:3478?transport=udp"},{"url":"turn:global.turn.twilio.com:3478?transport=udp","username":"ab0e6dd0637d0c0302cda644e31464cefd83c74aa663ca163953c24110a82efe","urls":"turn:global.turn.twilio.com:3478?transport=udp","credential":"Ufh56vO/Oy/gxpOo144kg/G7VMwEWxUJ/8y78dUSeuw="},{"url":"turn:global.turn.twilio.com:3478?transport=tcp","username":"ab0e6dd0637d0c0302cda644e31464cefd83c74aa663ca163953c24110a82efe","urls":"turn:global.turn.twilio.com:3478?transport=tcp","credential":"Ufh56vO/Oy/gxpOo144kg/G7VMwEWxUJ/8y78dUSeuw="},{"url":"turn:global.turn.twilio.com:443?transport=tcp","username":"ab0e6dd0637d0c0302cda644e31464cefd83c74aa663ca163953c24110a82efe","urls":"turn:global.turn.twilio.com:443?transport=tcp","credential":"Ufh56vO/Oy/gxpOo144kg/G7VMwEWxUJ/8y78dUSeuw="}] },
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
            setReceivingCall(false);

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
            if(stream === null){
                return;
            }
            stream.getTracks().forEach(function(track) {
                track.stop();
            });
            setUserStream(null);
    }
    function leaveCall(){
        stopStream(userStream);
        setCallAccepted(false);
        setPartnerStream(null);
        setReceivingCall(false);
        setCallEnding(false);
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
        notifyLeftCall,
        callEnding,
        leaveCall,
        setChatUser,
        chatUser,
        sendMessage
    }
    return (
        <ClientContext.Provider value ={value}>
            {props.children}
        </ClientContext.Provider>
    )
}

