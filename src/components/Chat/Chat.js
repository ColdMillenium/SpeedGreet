import React,  {useContext, useState, createRef} from 'react'
import styled ,{ withTheme, keyframes} from 'styled-components';
import {ClientContext} from '../../contexts/ClientContext'

const testData = [
    {msg:"Hey", from:"Andrew", to:"Lindsey", time:"2:00"},
    {msg:"What's up", from:"Lindsey", to:"Andrew", time:"2:50"},
    {msg:"Nothing much", from:"Lindsey", to:"Andrew", time:"4:50"},
    {msg:"Yeah I'm fine too", from:"Andrew", to:"Lindsey", time:"5:00"},
    {msg:"5 guys dawg", from:"Lindsey", to:"Andrew", time:"7:00"},
    {msg:"Hey", from:"Andrew", to:"Lindsey", time:"2:00"},
    {msg:"What's up", from:"Lindsey", to:"Andrew", time:"2:50"},
    {msg:"Nothing much", from:"Lindsey", to:"Andrew", time:"4:50"},
    {msg:"Yeah I'm fine too", from:"Andrew", to:"Lindsey", time:"5:00"},
    {msg:"5 guys dawg", from:"Lindsey", to:"Andrew", time:"7:00"},
    {msg:"Hey", from:"Andrew", to:"Lindsey", time:"2:00"},
    {msg:"What's up", from:"Lindsey", to:"Andrew", time:"2:50"},
    {msg:"Nothing much", from:"Lindsey", to:"Andrew", time:"4:50"},
    {msg:"Yeah I'm fine too", from:"Andrew", to:"Lindsey", time:"5:00"},
    {msg:"5 guys dawg", from:"Lindsey", to:"Andrew", time:"7:00"},
    {msg:"Hey", from:"Andrew", to:"Lindsey", time:"2:00"},
    {msg:"What's up", from:"Lindsey", to:"Andrew", time:"2:50"},
    {msg:"Nothing much", from:"Lindsey", to:"Andrew", time:"4:50"},
    {msg:"Yeah I'm fine too", from:"Andrew", to:"Lindsey", time:"5:00"},
    {msg:"5 guys dawg", from:"Lindsey", to:"Andrew", time:"7:00"},
    {msg:"Hey", from:"Andrew", to:"Lindsey", time:"2:00"},
    {msg:"What's up", from:"Lindsey", to:"Andrew", time:"2:50"},
    {msg:"Nothing much", from:"Lindsey", to:"Andrew", time:"4:50"},
    {msg:"Yeah I'm fine too", from:"Andrew", to:"Lindsey", time:"5:00"},
    {msg:"5 guys dawg", from:"Lindsey", to:"Andrew", time:"7:00"},
    
]
const ChatContainer = styled.div`
    height: 100%;
    grid-area: chat;
    display:grid;
    grid-template-areas: 
    "msg"
    "input" ;
    grid-template-rows: calc(100vh - 100px) 90px;
    grid-row-gap: 10px;
`;

const Input = styled.input`
        grid-area: input;
        color: grey;
        height: 2em;
        font-size: 1em;
        width: 90%;
        background-color: #363d47;
        border-radius: 0.4rem;
        border: none;
        outline: none;
        padding: 5px;
        justify-self: center;
        /* padding: 5px; */

        &:focus {
           border: solid 1px #47cf73;
        };

        &::placeholder{
            color: #47cf73;
            opacity: 0.3;
        };
    `
    const MessageContainer = styled.div`
        grid-area: msg;
        padding: 5px;
        width: 90%;
        overflow: auto;
        justify-self: center;
    `
    const MessageList = styled.div`
        margin: 0;
        padding: 0;
    `
    const MessageItem = styled.div`
        background-color: ${props =>{
            if(props.fromUs){
                return 'blue';
            }else{
                return 'grey';
            }
        }};
        color: ${props =>{
            if(props.fromUs){
                return 'white';
            }else{
                return 'black';
            }
        }};
        width: fit-content;
        margin: ${props =>{
            if(props.fromUs){
                return '0px 0px 20px auto';
            }else{
                return '0px auto 20px 0px';
            }
        }};
        padding: 2em;
        border-radius: 5px;
        font-size: 1em;
        
    `
const StartMessageContainer = styled.div`
    margin: 1em 0px;
    padding: 0;
`


function Chat(props) {   
    const {
        sendMessage, 
        chatUser, 
        msgHistory,
        users,
        yourID
    } = useContext(ClientContext);
    const inputRef = createRef();
    const userName = "Andrew";
    const caller = "Lindsey";
    const [message, setMessage] = useState('');
    const disabled = chatUser === null;
    function handleInputChange(e){
        if(inputRef.current!=null){
            inputRef.current = 
            setMessage(inputRef.current.value);
            console.log(message);
        }
    }

    function handleEnter(e){
        if(e.keyCode === 13){
            console.log("enter zawarudo!")
            sendMessage(message, chatUser);
            inputRef.current.value = '';
        }
    }
    let startingMsg = "<---- Pst. Click on a user to start a chat or call :)";
    if(!disabled){
        startingMsg = "The is the start of your chat with " + users[chatUser];
    }
    let messages = []
    if(msgHistory[chatUser]){
        messages = msgHistory[chatUser].messages;
        console.log(messages);
    }
    console.log(disabled);
    return (
        <ChatContainer>
            <MessageContainer>
                <StartMessageContainer>
                    {startingMsg}
                </StartMessageContainer>
                <MessageList>

                    
                    {
                        messages.map(( msgData =>{
                            const fromUs = (msgData.from === yourID);
                            return (<MessageItem key={msgData.time} fromUs={fromUs}>{msgData.msg}</MessageItem>)
                        }))
                    }
                </MessageList>
            </MessageContainer>
            <Input 
                ref={inputRef} 
                onKeyDown={(e)=> {handleEnter(e)} }
                onChange={(e)=>{handleInputChange(e)}} 
                placeholder= "Send Message" 
                disabled={chatUser === null}
            />
        </ChatContainer>
    )
}
{/* <UserName 
ref={nameRef} 
onChange={(e) => updateUserName()} 
onKeyDown={(e) => textFieldEnter(e)}id="outlined-basic" 
placeholder="StevieWonder" 
/> */}

export default withTheme(Chat);