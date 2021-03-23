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
import { Search } from '@material-ui/icons';
// import { Divider } from '@material-ui/core';
import randoDice from '../../assets/RandoDice.png';
import userIcon from '../../assets/userIcon.svg';
import msgSendBtn from '../../assets/msgSendBtn.png';
import { Divider } from '@material-ui/core';
import VideoCall from './VideoCall'

const MsgPanel = styled.div`
    
    position: relative;
    background-color: #213048;
    min-width: 300px;
    width: 100%;
`;
const MsgHistory = styled.div`
    
    margin: auto;
    height: calc(100% - 75px);
    padding: 0 30px;
    overflow-y: auto;

`;
const ReceivedMsg = styled.div`
    height: fit-content;
    width: fit-content;
    
    .from{
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 3px;
    }
    .name{
        font-size: 24px;
    }
    .time{
        font-size: 18px;
        color: #929292;
    }
    .msg{
        color: #213048;
        background-color: #A3F0F0;
        width: fit-content;
        font-size: 18px;
        padding: 20px;
        border-radius: 0 30px 30px 30px;
    }
`;
const SentMsg = styled(ReceivedMsg)`
    margin: 0 0 0 auto;
    .from{
        justify-content: right;
    }
    .msg{
        border-radius: 30px 0 30px 30px;
        background-color: #9CE878;
    }
`;

const MsgInput = styled.div`
    position: absolute;
    bottom: 0;
    left:0;
    right:0;
    background: #EFEFEF;
    height: 75px;
  
    padding: 0 10px 0 30px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;



    input{
        color: #C4C4C4;
        background: transparent;
        border: none;
        width: calc(100% - 40px);
        
    }
    input:focus{
        outline: 0;

    }
    input:active{
        border: none
    }
    button{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.1s ease;
        height: 100%;
        width: 40px
    }
    button:active{
        transform: scale(0.9);
        border: none;
    }
    button img{
        height: 40px; 
    }
`;

export function MsgPanelContent(){
    const {
        yourID,
        chatUser,
        sendMessage,
        rooms,
        users,
        getConversationMessages,
        callPeer
    } = useContext(ClientContext);
    const [message, setMessage] = useState('');
    let history = [];
    
  
    const inputRef = createRef();
    function handleInputChange(e){
        if(inputRef.current!=null){
            // inputRef.current = 
            setMessage(inputRef.current.value);
            console.log(message);
        }
    }

    function handleEnter(e){
        if(e.keyCode === 13){
            console.log("enter zawarudo!")
            sendMessage([chatUser], message);
            inputRef.current.value = '';
        }
    }

    function ShowHistory(){
        if(chatUser === null){
            return <div></div>
        }
        const messages = getConversationMessages([chatUser]);
        if(messages === null){
            return <div></div>
        }
        const renderedMessages = [];
        messages.forEach((msg, key) => {
            if(msg.sender === yourID){
                renderedMessages.push(<SentMsg key={key}>
                    <div className="from">
                        <div className="name">{users[msg.sender]}</div>
                        <div className="time"> @ {msg.time}</div>
                    </div>
                    <div className="msg">{msg.text}</div>
                </SentMsg>);
            }else{
                renderedMessages.push(<ReceivedMsg key={key}>
                    <div className="from">
                        <div className="name">{users[msg.sender]}</div>
                        <div className="time"> @ {msg.time}</div>
                    </div>
                    <div className="msg">{msg.text}</div>
                </ReceivedMsg>);
            }
        });
        return renderedMessages;
    }
   if(chatUser === null || rooms[chatUser] === null){
       return <MsgPanel ></MsgPanel>
   }else{
       
       console.log(rooms);
       return(
        <MsgPanel>
            <MsgHistory>
                <div> - Chat History with {users[chatUser]} - </div>
                <ShowHistory></ShowHistory> 
                <VideoCall></VideoCall>
            </MsgHistory>
            <MsgInput>
                <input 
                    ref={inputRef}
                    type="text"
                    onKeyDown={(e)=> {handleEnter(e)} }
                    onChange={(e)=>{handleInputChange(e)}} 
                    placeholder="Type something here to send..."
                />
                <button>
                    <img src={msgSendBtn} alt=""></img>
                </button>
                <button onClick={(e)=>{callPeer(chatUser)}}>
                   Call {users[chatUser]}
                </button>
                
            </MsgInput>
        </MsgPanel>
       )
   }
}





export default MsgPanelContent;