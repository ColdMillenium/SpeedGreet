import React, {useEffect, useState, useRef, createRef, useContext} from 'react';
import Button from '@material-ui/core/Button'
import './Chat.css'
import {ClientContext} from '../../contexts/ClientContext'
import Header from '../Header/Header'
// import OnlineUsers from './OnlineUsers';

import styled ,{ withTheme} from 'styled-components';

import randoDice from '../../assets/RandoDice.png';
import userIcon from '../../assets/userIcon.svg';




const UsersPanelContainer = styled.div`
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
    } = useContext(ClientContext);

  
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
        
            <UsersPanelContainer>
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
                    <img src={randoDice} className="rando-btn"></img>
                </RandoCall>
            </UsersPanelContainer>
    )
}

export default UsersPanel;