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
    
    useEffect(()=>{
        if(partnerVideoRef.current){
            if(partnerStream!=null){
                console.log("new video Rando stream!")
                partnerVideoRef.current.srcObject = partnerStream;
            }else{
                console.log("yeah its not here guys");
            }
        }
    },[partnerStream, partnerVideoRef]);

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

    if(partnerVideoRef.current){
        if(partnerStream!=null){
            console.log("new video Rando stream!")
            partnerVideoRef.current.srcObject = partnerStream;
        }else{
            console.log("yeah its not here guys");
        }
    }

    return (
            <VideoCallContainer>
               
                <PartnerVideo ref={partnerVideoRef} autoPlay id="local-video"></PartnerVideo>
            </VideoCallContainer>
    )
}

const VideoCallContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 9, 43, 0.79);
    height:100%;
    width:100%;


`
const PartnerVideo = styled.video`
    width:100%;
    background: url("https://i.vimeocdn.com/video/825140621.webp?mw=1500&mh=844&q=70");
    overflow:hidden;
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




