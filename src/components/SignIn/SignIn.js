import React, {createRef, useState, useContext}from 'react'
import { ClientContext } from '../../contexts/ClientContext'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ThemeConsumer } from 'styled-components';



export default function SignIn() {

    const nameRef = createRef();
    const [userName, setUserName] = useState("");
    const [feedback, setFeedBack] = useState();
    const {confirmUserName, hasUserName} = useContext(ClientContext);
    
    function textFieldEnter(e){
        if(e.keyCode === 13){
            setFeedBack(confirmUserName(userName));
        }
    }
    function updateUserName(e){
        if(nameRef.current!=null){
            nameRef.current.value = nameRef.current.value.split(' ').join('');
            setUserName(nameRef.current.value);
        }
    }
    function display(){
        return(
            <div>
                <p >Please Sign In:</p>
                    <TextField inputRef={nameRef} onChange={(e) => updateUserName()} onKeyDown={(e) => textFieldEnter(e)}id="outlined-basic" label="User Name" variant="outlined" />
                    <Button onClick={() => setFeedBack(confirmUserName(userName))} variant="contained" color="primary">SignIn</Button>
                <p>{feedback}</p>
            </div>
        )
    }
    
    return (
        <div>
            {display()}
        </div>
        
    )
}
