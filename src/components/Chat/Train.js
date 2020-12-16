import React, {useEffect, useState, useRef, createRef, useContext} from 'react';
import Button from '@material-ui/core/Button'
import './Chat.css'
import {ClientContext} from '../../contexts/ClientContext'
import Header from '../Header/Header'
import OnlineUsers from './OnlineUsers';
import Toolbar from '@material-ui/core/Toolbar';
import IncomingCall from '../IncomingCall/IncomingCall';
import styled ,{ withTheme} from 'styled-components';
import Chat from './Chat'


const RemoteVideo = styled.video`
    object-fit: fill;
    width: 100%;
    height: 100%;
    margin: 0px;
`;
const LocalVideo = styled.video`
    position: absolute;
    border: 1px solid ${props => props.theme.colors.accent};
    bottom: 0px;
    right: 0px;
    border-radius: 5px;
    width: 300px;
    box-shadow: 0 3 6 rgba(0, 0, 0, 0.2);
`;
const ContentContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    overflow: hidden;
`;

const GridLayout = styled.div`
    display: grid;
    grid-template-areas: 
    "users header"
    "users chat"
    "users chat" ;
    grid-template-columns: 240px calc(100vw - 240px);
    grid-template-rows: 40px auto 90px;
    overflow: hidden;
`;
const HeaderContainer = styled.div`
    grid-area: header;
`;

const ChatContainer = styled.div`
    grid-area: chat;
`;
const UsersContainer = styled.div`
    grid-area: users;
    overflow-x: hidden;
`;
export function Train(props) {
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
                <LocalVideo ref={userVideoRef} autoPlay muted id="local-video"></LocalVideo>
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
                <RemoteVideo ref={partnerVideoRef} autoPlay id="remote-video"></RemoteVideo>
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
                    <h5> 
                        Welcome {userName}!
                    </h5>
                    <h6 > 
                        {incomingCall}
                    </h6>
                </div>
            )
        }
    }
    return (
            <GridLayout>
                <HeaderContainer>
                    <Header/>
                </HeaderContainer>
                <UsersContainer>
                    <OnlineUsers users={users} callPeer={callPeer}></OnlineUsers>
                </UsersContainer>   
                {/* <VideoChatContainer> 
                    <IncomingCall></IncomingCall>
                    {partnerVideoWindow}
                    {userVideoWindow}
                </VideoChatContainer> */}
                <ChatContainer>
                    <Chat></Chat>
                </ChatContainer>
            </GridLayout>      
    )
}

export default withTheme(Train);