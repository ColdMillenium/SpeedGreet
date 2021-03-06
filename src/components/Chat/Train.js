import React, {useEffect, useState, useRef, createRef, useContext} from 'react';
import Button from '@material-ui/core/Button'
import './Chat.css'
import {ClientContext} from '../../contexts/ClientContext'
import Header from '../Header/Header'
// import OnlineUsers from './OnlineUsers';
import Toolbar from '@material-ui/core/Toolbar';
import IncomingCall from '../IncomingCall/IncomingCall';
import styled ,{ withTheme} from 'styled-components';
import Chat from './Chat'
import { AirlineSeatLegroomExtraSharp, Search } from '@material-ui/icons';
// import { Divider } from '@material-ui/core';
import randoDice from '../../assets/RandoDice.png';
import userIcon from '../../assets/userIcon.svg';

import settingsBtn from '../../assets/settings-btn.svg';
import backBtn from '../../assets/back-btn.svg'
import msgSendBtn from '../../assets/msgSendBtn.png';
import roadBackground from '../../assets/Road.png';
import MsgPanelContent from './MsgPanelContent'
import UsersPanel from './UsersPanel'





const RemoteVideo = styled.video`
    position: absolute;
    object-fit: fill;
    width: 100%;
    height: 100%;
    margin: 0px;
    right: 0;
    top: 0;
    left:0;
    bottom:70px;
`;
const LocalVideo = styled.video`
    position: fixed;
    border: 1px solid ${props => props.theme.colors.accent};
    bottom: 0px;
    left: 100px;
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

// const GridLayout = styled.div`
//     display: grid;
//     grid-template-areas: 
//     "options users header"
//     " options users chat"
//     " options users chat" ;
//     grid-template-columns: 50px 240px calc(100vw - 240px -50px);
//     grid-template-rows: 40px auto 90px;
//     overflow: hidden;
// `;
const Layout = styled.div`
    position: relative;
    display: flex;
    height: 100vh;
    width: 100vw;
    margin: 0;
    background: linear-gradient(180deg, rgba(23, 113, 0, 0.32) 13.85%, rgba(8, 17, 50, 0.8) 85.21%), url(${roadBackground});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
`
const SettingPanel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: rgba(5, 32, 45, 1);;
    max-height: 100vh;
    /* max-width: 60px; */
    padding: 25px 10px;
    
    
    svg {
        color: #B1FFAB;
        max-width: 50px;
        transform: scale(-1);
    }
    svg:hover{
        color: white;
        transform: scale(-1.05)
    }


`;

const RandoCallOptions = styled.div`
    position: absolute;
    display: flex;
    gap: 30px;
    top: 0;
    right: 0;
    padding: 20px;
    background: white;
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
        callEnding,
        yourID,
        setChatUser,
        chatUser,
        sendMessage,
        rooms,
        setRooms,
        isInRandoCall,
        joinRandoCall,
        leaveRandoCall,
        skipRandoCall,
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
            
                <RemoteVideo ref={partnerVideoRef} autoPlay id="remote-video"></RemoteVideo>
        );
    }
    
    let incomingCall;
    // if (receivingCall && !callAccepted && callerId != null && callerId != "") {
    //     console.log(callerId);
    //     incomingCall = <IncomingCall></IncomingCall>
    // }
   
    let handleUserSelect = (id)=>{
        console.log(id);
        if(rooms.hasOwnProperty(id)){

            const newRoom = rooms;
            newRoom[id] = [];
            setRooms(newRoom);
            console.log("new room needed for talking to " + id);
        }else{
            console.log(rooms);
        }
        setChatUser(id);
        console.log("oh yeah>");
    }

    let displayRandoCallOptions;
    if(isInRandoCall){
        displayRandoCallOptions= (
            <RandoCallOptions>
                <button onClick={(e)=> {leaveRandoCall()}}>Exit Rando Calls</button>
                <button onClick={(e)=> skipRandoCall()}>Skip this call</button>
            </RandoCallOptions>
        )
    }else{
        displayRandoCallOptions =(
            <RandoCallOptions>
                <button onClick={(e)=> {joinRandoCall()}}>Join rando call</button>
            </RandoCallOptions>
        )
    }
    


    return (
          
        <Layout>
            
            {displayRandoCallOptions}
            <SettingPanel>
                {incomingCall}
                {/* {partnerVideoWindow} */}
               
                {/* <img src={settingsBtn} alt=""/> */}
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-sign-out-alt fa-w-16 fa-3x"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" className=""></path></svg>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sliders-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-sliders-h fa-w-16 fa-5x"><path fill="currentColor" d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z" className=""></path></svg>
            </SettingPanel>
            <UsersPanel></UsersPanel>
            <MsgPanelContent 
                chatUser={chatUser} 
                users={users}
                sendMessage={sendMessage}
                rooms={rooms}
            >

            {partnerVideoWindow}
            </MsgPanelContent>
            
        </Layout>  
    )
}

export default withTheme(Train);