import React, {useEffect, useState, useRef, createRef, useContext} from 'react';
import Button from '@material-ui/core/Button'
import './Chat.css'
import {ClientContext} from '../../contexts/ClientContext'
import Header from '../Header/Header'
// import OnlineUsers from './OnlineUsers';

import styled ,{ withTheme} from 'styled-components';

import randoDice from '../../assets/RandoDice.png';
import userIcon from '../../assets/userIcon.svg';



export function VideoCall(props) {
    const {
        userName, 
        users,
        callerId,
        callAccepted,
        userStream,
        partnerStream,
        notifyLeftCall,
        leaveCall,
        callEnding,
    } = useContext(ClientContext);

    const userVideoRef = useRef();
    const partnerVideoRef = useRef();
    



    // let userList = [];
    // for(let user of users ){
    //     userList.push(<OnlineUser>{user}</OnlineUser>)
    // }
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
                    Leave Call with {users[callerId].name}
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
               
                <RemoteVideo ref={partnerVideoRef} autoPlay id="remote-video"></RemoteVideo>
            </div>
        );
    }

    return (
        
            <VideoCallContainer>
                {partnerVideoWindow}
                {userVideoWindow}
            </VideoCallContainer>
    )
}

const VideoCallContainer = styled.div`
   

`;
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

export default VideoCall;




