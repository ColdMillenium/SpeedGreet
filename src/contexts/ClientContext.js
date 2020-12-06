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
    const [hasUserName, setHasUserName] = useState(false);
    const [userName, setUserName] = useState("userNAME");
    const [userNameRef, setUserNameRef] = useState();
    const [canUpdateName, setCanUpdateName] = useState(false);

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
            setCaller(data.from);
            setCallerSignal(data.signal);
            //console.log("receiving call dawg");
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
        confirmUserName,
        userName,
        hasUserName,
        partnerStream,
        stream,
        users,
        yourID,
        receivingCall,
        callUser,
        onPartnerAcceptsCall,
        notifyAcceptCall,
        callerSignal,
        caller,
        callAccepted,
        setCallAccepted,
    }
    return (
        <ClientContext.Provider value ={value}>
            {props.children}
        </ClientContext.Provider>
    )
}

