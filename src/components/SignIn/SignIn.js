import React, {createRef, useState, useContext}from 'react'
import { ClientContext } from '../../contexts/ClientContext'
// import { Button, TextField } from '@material-ui/core'
import { makeStyles, useTheme} from '@material-ui/core/styles';
import styled ,{ withTheme, keyframes} from 'styled-components';


    //Container styling
    const Container = styled.div`
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content:center;
        text-align: center;
        align-items:center;
        box-sizing: border-box; //maybe should make global thing

        & *{
            box-sizing: border-box;
        }
        
    `
    

    //  Title Styling
    const TitleFadeIn = keyframes`
        from {
            transform: translateY(-50%);
            opacity: 0;
        }

        to {
            transform: translateY(0%);
            opacity: 1;
        }
    `;
    const TitleWrapper = styled.div`
        animation: ${TitleFadeIn} 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
        margin: 2em 2em 7em 2em;
    `;
    const Welcome =styled.div`
        font-size: 3em;
        font-weight: 200;
        text-align:center;
    `
    const Company=styled.div`
        font-size: 3.5em;
        font-weight: 200;
        text-decoration: underline;     
        text-decoration-color: #47cf73;  
    `;


    //Sign In Styling 
    const SignInFadeIn = keyframes`
        from {
            transform: translateY(50%) scale(0.7, 0.7);
            opacity: 0;
            scale(0.2, 0.2);
        }

        to {
            transform: initial;
            opacity: 1;
            ;
        }
    `;
    
    const SignInCard = styled.div`
        display: flex;
        height: fit-content;
        width: fit-content;
        flex-direction: column;
        padding: 50px;
        gap: 10px;
        background-color: ${props => props.theme.colors.dark};
        /* background-color: #6ed87e; */
        /* color: ${props=> props.theme.colors.light}; */
        color: #EFEFEF;
        border: 2px solid #2354C5;
        border-radius: 2px;
        /* border: solid 2px #6ed87e; */
        margin: 20px;
        box-shadow: ${props=>props.theme.bs};
        animation: ${SignInFadeIn} 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
        animation-delay: 0.7s;
    `;
    const Label = styled.label`
        color: #47cf73;
        padding-bottom: 5px;
        margin-bottom: 0px;
        
    `;
    const ButtonWrapper = styled.div`
        
    `;
    
    const Error = styled.small`
        color: ${props => props.theme.colors.error};
    `;
    const Header = styled.h2`
        margin-bottom: 20px;
    `;

    const UserName = styled.input`
        color: #929292;
        height: 3em;
        font-size: 1em;
        width: 100%;
        text-align: center;
        vertical-align: bottom;
        background-color: ${props => props.theme.colors.dark};
        border: none;
        border-bottom: 1px solid #929292;
        outline: none;
        padding: 0px;
        /* padding: 5px; */
        margin-bottom: 50px;

        &:focus {
           border: none;
           border-bottom: 1px solid #929292;
        };

        &::placeholder{
            text-align: bottom;
            color: #929292;
            opacity: 0.3;
        };
    `
    const SignInBtn = styled.button`
        cursor: pointer;
        
        border: 1px solid #5DBE30;
        border-radius: 50px;
        background-color: transparent;
        padding: 10px 25px;
        margin: 0 auto;
        color: #5DBE30;
        transition: all 0.1s ease-in;

        &:hover{
            color: #EFEFEF;
            background-color: #5DBE30;
            transform: scale(1.05);
        }
    `

    
export function SignIn(props) {
    const theme = props.theme;
    console.log(props.theme);
    const nameRef = createRef();
    const [userName, setUserName] = useState("");
    const {validateUserName, signInError} = useContext(ClientContext);
    
    function textFieldEnter(e){
        if(e.keyCode === 13){
            validateUserName(userName);
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
            <Container>
                <TitleWrapper>
                    <Welcome>Welcome to </Welcome>
                    <Company>Speed Greet.</Company>
                </TitleWrapper>
                
                <SignInCard>
                    <Header >Welcome Back</Header>
                    <div><em>Select Username</em></div>
                    <div></div>
                    {/* okay apparently you have to put input in like this... */}
                    {/* <TextField 
                        inputProps={{style: {color: theme.colors.dark}}} 
                        inputRef={nameRef} 
                        onChange={(e) => updateUserName()} 
                        onKeyDown={(e) => textFieldEnter(e)}id="outlined-basic" 
                        label="User Name" 
                        variant="outlined" 
                    /> */}
                    <br/>
                    
                        <UserName 
                            ref={nameRef} 
                            onChange={(e) => updateUserName()} 
                            onKeyDown={(e) => textFieldEnter(e)}id="outlined-basic" 
                            placeholder="StevieWonder" 
                        />
                   
                    
                    {/* <ButtonWrapper>
                        <Button onClick={() => validateUserName(userName)} variant="contained" color="primary">SignIn</Button>
                    </ButtonWrapper> */}
                    <SignInBtn onClick={() => validateUserName(userName)}>
                        Sign In
                    </SignInBtn>
                </SignInCard>
                <Error >{signInError}</Error>
                   
            </Container>
        )
    }
    
    return (
        <div>
            {display()}
        </div>
        
    )
}

export default withTheme(SignIn);
