import React, {createContext, useState, useRef, useEffect} from 'react'
import io from "socket.io-client";
import Peer from "simple-peer";

export const ClientContext = createContext();
export default function ClientContextProvider(props) {
    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState();
    const [partnerStream, setPartnerStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [hasUserName, setHasUserName] = useState(true);
    const [userName, setUserName] = useState("userNAME");
    const [userNameRef, setUserNameRef] = useState();
    const [canUpdateName, setCanUpdateName] = useState(false);

    const socket = useRef();
    useEffect(()=>{
        socket.current = io.connect("/");
        socket.current.on("yourID", (id) => {
            setYourID(id);
            
        })
        socket.current.on("allUsers", (users) => {
            setUsers(users);
        })
        socket.current.on("hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
            //console.log("receiving call dawg");
        })
        
    },[]);
    function callPeer(partnerID) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(newStream => {
            setStream(newStream);
            //console.log("calling someone bruh");
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: newStream,
            });
            
            peer.on("signal", data => {
                socket.current.emit("callUser", { userToCall: partnerID, signalData: data, from: yourID })
            })
        
            peer.on("stream", partnerStream => {
                setPartnerStream(partnerStream);
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
                setPartnerStream(partnerStream);              
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
    function confirmUserName(name){
        if(name.length < 3){
            return("NAME_TOO_SHORT");
        }
        if(users[name]){
            return("NAME_ALREADY_EXISTS");
        }
        setUserName(name);
        setHasUserName(true);
        socket.current.emit("yourUserName", name);
        return null;
    }
    const value = {
        callPeer, 
        acceptCall, 
        confirmUserName,
        userName,
        hasUserName
    }
    return (
        <ClientContext.Provider value ={value}>
            {props.children}
        </ClientContext.Provider>
    )
}

