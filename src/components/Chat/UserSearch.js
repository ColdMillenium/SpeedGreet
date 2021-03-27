import React, {useEffect, useState, useRef, createRef, useContext} from 'react';
import './Chat.css'
import {ClientContext} from '../../contexts/ClientContext'
import styled  from 'styled-components';
import userIcon from '../../assets/userIcon.svg';


export function UserSearch(props) {
    const {
        users,
        callPeer,
        yourID,
        setChatUser,
        rooms,
        setRooms,
    } = useContext(ClientContext);

    const [searchInput, setSearchInput] = useState("");
    const searchInputRef = createRef();
  
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
    
    return (
            <div>
                <SearchUsers>
                    <input onChange={(e) => updateSearchInput()} ref={searchInputRef} type="text" placeholder="Search..."></input>
                </SearchUsers>
                <OnlineUsersContainer>
                    {onlineUsersList()}
                </OnlineUsersContainer>
            </div>    
            )
}

export default UserSearch;

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


