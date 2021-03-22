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
    max-width: 60px;
    padding: 10px;
    
    
    svg {
        max-width: 40px;
        transform: scale(-1);
    }
`;

const UsersPanel = styled.div`
    background-color: #303742;
    min-width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 50px;

`;
const SearchUsers = styled.div`
    display: flex;
  
    
    input{
        width: 100%;
        font-size: 18px;
        background-color: #282C33;
        border: none;
        padding: 13px;
        border-radius: 50px;
        color: #929292;
    }

    input:focus{
        outline: 0;

    }
    input:active{
        border: none
    }

`;
const OnlineUsersContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height: 100%;
    overflow-y: auto;
`;
const OnlineUser = styled.div`
    display: flex;
    flex-direction: row;
    cursor: pointer;
    transition: all 0.1s ease-in;
    
    color: #EFEFEF;
    img{
        height: 50px;
        width: 50px;
       
        margin-right: 10px;
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .info.name{
        font-family: 'Roboto';
        font-size: 18px;
        font-weight: 300;
    }
    &:hover{
        opacity: 0.6;
    }
`;
const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;

    .tag{
        font-size: 12px;
        padding: 3px 6px;
        margin: 0 3px;
        border-radius: 50px;
       
    }
    .tag.first{
        background-color:#EB5757 ;
    }
    .tag.second{
        background-color:#F2994A ;
    }
    .tag.third{
        background-color:#6FCF97;
    }
    
`;

const Divider = styled.div`
    height: 1px;
    background-color: #929292;
    width: 100%;
`;
const RandoCall = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    .rando-header{
        font-size: 32px;
        font-family: 'Montserrat';
        font-weight: bold;
      
    }

`;

const MsgPanel = styled.div`
    
    position: relative;
    background-color: #213048;
    min-width: 300px;
    width: 100%;
`;
const MsgHistory = styled.div`
    
    margin: auto;
    height: calc(100% -75px);
    padding: 0 30px;

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

function MsgPanelConent(props){
    const [message, setMessage] = useState('');
    let history = [];
    console.log(props);

  
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
            props.sendMessage(message, props.chatUser);
            inputRef.current.value = '';
        }
    }
   if(props.chatUser === null || props.rooms[props.chatUser] === null){
       return <MsgPanel >{props.currentRoom}</MsgPanel>
   }else{
       
    //    const history = props.rooms[props.chatUser].history;
       return(
        <MsgPanel>
            <MsgHistory>
                <div> - Chat History with {props.users[props.chatUser]} - </div>
                <ReceivedMsg>
                    <div className="from">
                        <div className="name">Cloe Fish</div>
                        <div className="time"> @ 8:30pm</div>
                    </div>
                    <div className="msg">Dude...you're actually kind of an asshole</div>
                </ReceivedMsg>
                <SentMsg>
                    <div className="from">
                        <div className="name">John Doe</div>
                        <div className="time"> @ 8:31pm</div>
                    </div>
                    <div className="msg">Hey, it was really nice to meet you</div>
                </SentMsg>
                {history.forEach((text, index)=>{
                    return <div key={index}>{text.msg}</div>
                })}
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
                
            </MsgInput>
        </MsgPanel>
       )
   }
}



// const HeaderContainer = styled.div`
//     grid-area: header;
// `;

// const ChatContainer = styled.div`
//     grid-area: chat;
// `;
// const UsersContainer = styled.div`
//     grid-area: users;
//     overflow-x: hidden;
// `;


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
        //old stuff
            // <GridLayout>
            //     <HeaderContainer>
            //         <Header/>
            //     </HeaderContainer>
            //     <UsersContainer>
            //         <OnlineUsers users={users} callPeer={callPeer}></OnlineUsers>
            //     </UsersContainer>   
            //     {/* <VideoChatContainer> 
            //         <IncomingCall></IncomingCall>
            //         {partnerVideoWindow}
            //         {userVideoWindow}
            //     </VideoChatContainer> */}
            //     <ChatContainer>
            //         <Chat></Chat>
            //     </ChatContainer>
            // </GridLayout>      

        //new stuff
        <Layout>
            <SettingPanel>
                {/* <img src={settingsBtn} alt=""/> */}
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-sign-out-alt fa-w-16 fa-3x"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" class=""></path></svg>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sliders-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-sliders-h fa-w-16 fa-5x"><path fill="currentColor" d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z" class=""></path></svg>
            </SettingPanel>
            <UsersPanel>
                <SearchUsers>
                    <input type="text" placeholder="Search..."></input>
                </SearchUsers>
                <OnlineUsersContainer>
                    {/* //Generate users from server       */}
                    {Object.keys(users).map(key => {
                        if (key === yourID) {
                            return null;
                        }
                        return (
                            <OnlineUser 
                                key ={key} 
                                name={users[key]}  
                                userId={key} 
                                callPeer={() => callPeer(key)} className="user"
                                onClick={() =>handleUserSelect(key)}
                            >
                                <img src={userIcon} className="icon"></img>
                                <div className="info">
                                    <div className="name">{users[key]}</div>
                                    <Tags >
                                        <div className="className first">anime</div>
                                        <div className="tag second">music</div>
                                        <div className="tag third">gaming</div>
                                    </Tags>
                                </div>
                            </OnlineUser>
                        );
                    })}
                </OnlineUsersContainer>
                <Divider></Divider>
                <RandoCall>
                    <div className="rando-header">Rando Call</div>
                    <img src={randoDice} className="rando-btn">

                    </img>
                </RandoCall>

            </UsersPanel>
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