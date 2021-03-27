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



export function MsgPanelContent(props){

    
    const {
        yourID,
        chatUser,
        sendMessage,
        rooms,
        users,
        getConversationMessages,
        callPeer,
        randoCallData,
        partnerStream,
        randoCallInitiator,
        setupRandoCall,
        callerId,
    } = useContext(ClientContext);
    const [message, setMessage] = useState('');
    const [hasPartner, setHasPartner] = useState(false);
    let history = [];
    const partnerVideoRef = useRef();
    
    const inputRef = createRef();
    function handleInputChange(e){
        if(inputRef.current!=null){
            // inputRef.current = 
            setMessage(inputRef.current.value);
            console.log(message);
        }
    }

    useEffect(()=>{
        if(partnerVideoRef.current){
            if(partnerStream!=null){
                console.log("new video Rando stream!")
                partnerVideoRef.current.srcObject = partnerStream;
            }else{
                console.log("yeah its not here guys");
            }
        }
    },[partnerStream, partnerVideoRef])

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
                        <div className="name">{users[msg.sender].name}</div>
                        <div className="time"> @ {msg.time}</div>
                    </div>
                    <div className="msg">{msg.text}</div>
                </SentMsg>);
            }else{
                renderedMessages.push(<ReceivedMsg key={key}>
                    <div className="from">
                        <div className="name">{users[msg.sender].name}</div>
                        <div className="time"> @ {msg.time}</div>
                    </div>
                    <div className="msg">{msg.text}</div>
                </ReceivedMsg>);
            }
        });
        return renderedMessages;
    }
    let partnerVideoWindow;
    if(partnerVideoRef.current){
        if(partnerStream!=null){
            console.log("new video Rando stream!")
            partnerVideoRef.current.srcObject = partnerStream;
        }else{
            console.log("yeah its not here guys");
        }
    }
   if(chatUser === null || rooms[chatUser] === null){
       return <MsgPanel > 
               <VideoCall></VideoCall>
           </MsgPanel>
   }else{
       
       console.log(rooms);
       return(
        <MsgPanel>
               <VideoCall></VideoCall>
            <MsgHistory>
                <div> - Chat History with {users[chatUser].name} - </div>
                <ShowHistory></ShowHistory> 
            </MsgHistory>
            <MsgInput>
                <input 
                    ref={inputRef}
                    type="text"
                    onKeyDown={(e)=> {handleEnter(e)} }
                    // onChange={(e)=>{handleInputChange(e)}} 
                    placeholder="Type something here to send..."
                />
                <button>
                    <img src={msgSendBtn} alt=""></img>
                </button>
                <button onClick={(e)=>{callPeer(chatUser)}}>
                   Call {users[chatUser].name}
                </button>
                
            </MsgInput>
        </MsgPanel>
       )
   }
}





export default MsgPanelContent;

const MsgPanel = styled.div`
    
    position: relative;
    background-color: transparent;
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
        font-weight: bold;
        font-size: 16px;
    }
    .time{
        font-size: 14px;
        color: rgba(222, 222, 222, 1);
;
    }
    .msg{
        color: #EFEFEF;
        background: linear-gradient(180deg, rgba(163, 240, 240, 0.6) 0%, rgba(163, 240, 240, 0.384) 99.99%);
        width: fit-content;
        font-size: 14px;
        padding: 12px;
        border-radius: 0 30px 30px 30px;
        box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.25);
    }
    
`;

const SentMsg = styled(ReceivedMsg)`
    margin: 0 0 0 auto;
    .from{
        justify-content: right;
    }
    .msg{
        border-radius: 30px 0 30px 30px;
        background: linear-gradient(180deg, rgba(156, 232, 120, 0.6) 0%, rgba(156, 232, 120, 0.5175) 99.99%, rgba(156, 232, 120, 0.384) 100%);

    }
`;
const RemoteVideoWrap = styled.div`
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
const RemoteVideo = styled.video`
    width:100%;
    background: url("https://i.vimeocdn.com/video/825140621.webp?mw=1500&mh=844&q=70");
    overflow:hidden;
`;

const MsgInput = styled.div`
   
    position: absolute;
    bottom: 0;
    left:0;
    right:0;
    background: #0D4C4A;
    height: 75px;
  
    padding: 0 10px 0 30px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    



    input{
        background: transparent;
        color: #B1FFAB;
        border: none;
        width: calc(100% - 40px);
        height:100%;
        font-family: 'Roboto';
        font-weight: light;
        
    }
    input:focus{
        outline: 0;

    }
    input:active{
        border: none
    }
    button{
        color: #B1FFAB;
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