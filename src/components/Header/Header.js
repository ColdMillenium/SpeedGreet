import React from 'react'
import {ClientContext} from '../../contexts/ClientContext'
import { makeStyles, useTheme} from '@material-ui/core/styles'

export default function Header() {
    const theme = useTheme();
    const useStyles = makeStyles({
        header: {
          background: theme.colors.dark,
          color: theme.colors.accent,
          padding: "10px 40px",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center"
        
        },
        logoImg:{
            width: 70,
            height: 70,
        },
        logoContainer:{
            display: "flex",
            alignItems: "center"
        },
        logoText:{
            marginLeft: 10,
            marginRight: 10
        }
    });
    const classes = useStyles();
    return (
        <header className={classes.header}>
      
            <img src="http://icons.iconarchive.com/icons/google/noto-emoji-smileys/1024/10041-winking-face-with-tongue-icon.png" 
            alt="doge logo" 
            className={classes.logoImg} />
            <h1 className={classes.logoText}>
            Meet<span className="logo-highlight">&</span>Greet 
            </h1>
            <img src="https://icons.iconarchive.com/icons/google/noto-emoji-smileys/128/10003-face-with-tears-of-joy-icon.png" alt="doge logo" className={classes.logoImg} />
      
        </header>
    )
}
// .header {
//     background-color: #ffffff;
//     padding: 10px 40px;
//     box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
//   }
  
//   .header > .logo-container {
//     display: flex;
//     align-items: center;
//   }
  
//   .header > .logo-container > .logo-img {
//     width: 70px;
//     height: 70px;
//     margin-right: 15px;
//   }
  
//   .header > .logo-container > .logo-text {
//     font-size: 26px;
//     font-weight: 700;
//   }
  
//   .header > .logo-container > .logo-text > .logo-highlight {
//     color: #65a9e5;
//   }