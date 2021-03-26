import React, {useEffect, useState, useRef, createRef, useContext} from 'react';
import Button from '@material-ui/core/Button'
import './Chat.css'
import {ClientContext} from '../../contexts/ClientContext'
import Header from '../Header/Header'
// import OnlineUsers from './OnlineUsers';

import styled ,{ withTheme} from 'styled-components';

import randoDice from '../../assets/RandoDice.png';
import userIcon from '../../assets/userIcon.svg';







export function UsersPanel(props) {
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
        joinRandoCall,
        isInRandoCall,
        skipRandoCall,
        leaveRandoCall
       

    } = useContext(ClientContext);
    const [searchInput, setSearchInput] = useState("");

    const searchInputRef = createRef();
    const userVideoRef = useRef();

  
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
    const updateSearchInput = () =>{
        setSearchInput(searchInputRef.current.value);
    }

    const filteredUsers = () =>{
        if(searchInput == ""){
            return Object.keys(users);
        }

        

        return Object.keys(users).filter(id =>{
          
            if(users[id].name.toLowerCase().includes(searchInput.toLowerCase())){
                //matching the name
                 return true;
            }else if(users[id].tags.filter(tag => tag.toLowerCase().includes(searchInput.toLowerCase())).length>0){
                //matching amy of the tags
                return true;
            }else{
                return false;
            }
        })
    }

    const tagslist= (tags) =>{
        const list = [];
        tags.forEach((tag)=>{
            if(tag == '' ){
                return;
            }
            list.push(<div className="tag">{tag}</div>)
        })
        return list;
    }
    
    const  onlineUsersList = () =>{
        
        console.log(users);
        const list = []
        filteredUsers().map(id => {
            if (id === yourID) {
                return null;
            }
            const name = users[id].name;
            const tags = users[id].tags
            list.push(
                <OnlineUser 
                    key ={id} 
                    name={name}  
                    userId={id} 
                    callPeer={() => callPeer(id)} className="user"
                    onClick={() =>handleUserSelect(id)}
                >
                    <img src={userIcon} className="icon"></img>
                    <div className="info">
                        <div className="name">{name}</div>
                        <TagsContainer>
                            {tagslist(tags)}
                        </TagsContainer>  
                    </div>
                </OnlineUser>
            );
        });
        return list;
    } 
    if(userVideoRef.current){
        if(userStream!=null){
            console.log("new video stream!")
            userVideoRef.current.srcObject = userStream;
        }else{
            console.log("yeah its not here guys");
        }
    }
    let userVideoWindow;
        if(isInRandoCall){
            userVideoWindow = (
                <div>
                    <button onClick={(e)=> {leaveRandoCall()}}>Exit Rando Calls</button>
                    <button onClick={(e)=> skipRandoCall()}>Skip this call</button>
                    <LocalVideo ref={userVideoRef} autoPlay muted id="local-video"></LocalVideo>
                </div>
                
            )
        }
        
    
    let randoCallBtn;

    if(!isInRandoCall){
        randoCallBtn = (
            <RandoCall onClick={(e)=>{joinRandoCall()}}>
            <div className="rando-header">Rando Call</div>
            <img src={randoDice} className="rando-btn"></img>
            </RandoCall>)
    }
    
    
    
    
   
    return (
        
            <UsersPanelContainer>
                <SearchUsers>
                    <input onChange={(e) => updateSearchInput()} ref={searchInputRef} type="text" placeholder="Search..."></input>
                </SearchUsers>
                <OnlineUsersContainer>
                    {/* //Generate users from server*/}
                    {onlineUsersList()}
                </OnlineUsersContainer>
                <Divider></Divider>
                 {randoCallBtn}
                {userVideoWindow}
            </UsersPanelContainer>
    )
}

export default UsersPanel;

const UsersPanelContainer = styled.div`
    background:linear-gradient(180deg, rgba(46, 117, 105, 0.7) 0%, rgba(7, 39, 58, 0.7) 100%);


    /* background-color: blue; */
    /* background-color: linear-gradient(180deg, rgba(46, 117, 105, 0.7) 0%, rgba(7, 39, 58, 0.7) 100%); */
    min-width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    filter: drop-shadow(4px 0px 10px rgba(0, 0, 0, 0.25));

`;
const SearchUsers = styled.div`
    display: flex;
  
    
    input{
        width: 100%;
        font-size: 18px;
        border: none;
        padding: 13px;
        border-radius: 50px;
        color: #B1FFAB;
        background: rgba(14, 69, 69, 1);
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1) inset;

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
        font-size: 16px;
        font-weight: 300;
    }
    &:hover{
        opacity: 0.6;
    }
`;
const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    .tag{
        font-size: 12px;
        padding: 3px 6px;
        margin: 0 3px;
        border-radius: 50px;
       
    }
    .tag:nth-child(1){
        background-color:#EB5757 ;
    }
    .tag:nth-child(2){
        background-color:#F2994A ;
    }
    .tag:nth-child(3){
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
const UserVideo = styled.div`
    
`
const LocalVideo = styled.video`
    border: 1px red;
    width: 100%;
   ;
    border-radius: 5px;
    width: 300px;
    box-shadow: 0 3 6 rgba(0, 0, 0, 0.2);
`;


