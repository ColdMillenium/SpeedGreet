import React, {createRef, useState, useContext}from 'react'
import { ClientContext } from '../../contexts/ClientContext'
import { Button, TextField } from '@material-ui/core'
import { makeStyles, useTheme} from '@material-ui/core/styles';
import { ThemeConsumer } from 'styled-components';
import Typography from "@material-ui/core/Typography";



export default function SignIn() {
    const theme = useTheme();
    const useStyles = makeStyles((theme)=>({
        signIn: {
          padding: 20,
        },
        input:{
            color: theme.colors.light
        }
        
    }));
    
    const classes = useStyles();
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
                <Typography variant="h4">Please Sign In:</Typography>
                    {/* okay apparently you have to put input in like this... */}
                    <TextField inputProps={{className: classes.input}} inputRef={nameRef} onChange={(e) => updateUserName()} onKeyDown={(e) => textFieldEnter(e)}id="outlined-basic" label="User Name" variant="outlined" />
                    <br/>
                    <Button onClick={() => setFeedBack(confirmUserName(userName))} variant="contained" color="primary">SignIn</Button>
                    <Typography variant="p">{feedback}</Typography>
            </div>
        )
    }
    
    return (
        <div>
            {display()}
        </div>
        
    )
}
