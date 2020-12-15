import React from 'react'
import {ClientContext} from '../../contexts/ClientContext'
import { makeStyles, useTheme} from '@material-ui/core/styles'
// import AppBar from '@material-ui/core/AppBar';
import styled ,{ withTheme} from 'styled-components';
import Toolbar from '@material-ui/core/Toolbar';
// const useStyles = makeStyles((theme)=> ({
//     appBar: {
//       background: theme.colors.dark,
//       color: theme.colors.accent,
//       padding: "10px 40px",
//       boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
//       display: "flex",
//       alignItems: "center",
//       zIndex: theme.zIndex.drawer + 1, //I guess this makes it so it sits above the default z index of drawers.
    
//     },
//     logoImg:{
//         width: 70,
//         height: 70,
//     },
//     logoContainer:{
//         display: "flex",
//         alignItems: "center"
//     },
//     logoText:{
//         marginLeft: 10,
//         marginRight: 10
//     }
// }));
const AppBar = styled.div`
      background: ${props => props.theme.colors.dark};
      color: ${props => props.theme.colors.accent};
      padding: 0.2em;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
      top: 0px;
      width: 100vw;
      height: fit-content;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
   
`;

const LogoImg = styled.img`
    width: 2em;
    height: 2em;
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`;
const TitleText = styled.div`
    margin: 0px 10px;
`;

export  function Header() {;
    return (
        <AppBar position="fixed" >
            {/* Toolbar makes all these items fit one one line */}
            <Toolbar>
            <LogoImg 
                src="http://icons.iconarchive.com/icons/google/noto-emoji-smileys/1024/10041-winking-face-with-tongue-icon.png" 
                alt="doge logo" 
             />
            <TitleText>Speed Greet</TitleText>
            <LogoImg 
                src="https://icons.iconarchive.com/icons/google/noto-emoji-smileys/128/10003-face-with-tears-of-joy-icon.png" 
                alt="doge logo" 
            />
            </Toolbar>
       
        </AppBar>
    )
}

export default withTheme(Header)