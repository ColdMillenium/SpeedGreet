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
import MsgPanelContent from './MsgPanelContent'
import UsersPanel from './UsersPanel'





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
    display: flex;
    height: 100vh;
    width: 100vw;
    margin: 0;
`
const SettingPanel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #282C33;
    max-height: 100vh;
    /* max-width: 60px; */
    padding: 10px;
    
    
    svg {
        max-width: 40px;
        transform: scale(-1);
    }
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
    } = useContext(ClientContext);

    const userVideoRef = useRef();
    const partnerVideoRef = useRef();
    const caller = users[callerId];
    
    
    
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
        return <IncomingCall></IncomingCall>
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

    return (
          
        <Layout>
            <SettingPanel>
                {/* <img src={settingsBtn} alt=""/> */}
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-sign-out-alt fa-w-16 fa-3x"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" className=""></path></svg>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sliders-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-sliders-h fa-w-16 fa-5x"><path fill="currentColor" d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z" className=""></path></svg>
                <IncomingCall></IncomingCall>
            </SettingPanel>
            <UsersPanel></UsersPanel>
            <MsgPanelContent 
                chatUser={chatUser} 
                users={users}
                sendMessage={sendMessage}
                rooms={rooms}
            ></MsgPanelContent>
            
        </Layout>  
    )
}

export default withTheme(Train);