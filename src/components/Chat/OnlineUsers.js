import React ,{useContext} from 'react'
import { makeStyles, useTheme} from '@material-ui/core/styles'
import {ClientContext} from '../../contexts/ClientContext'
import User from './User';
//import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import styled ,{ withTheme} from 'styled-components';


const drawerWidth = "240px";

// const useStyles = makeStyles((theme) =>({
//     drawerContainer: {
//         overflow: 'auto',
//         color: theme.colors.light,
//         height: '100%',
//     },
//     title:{
//         margin: '10 0 0 0',
//         paddingLeft: 30,
//         borderBottom: '1px solid #cddfe7',
//         paddingBottom: 10,
//     },
//     drawer: {//drawer
//         width: drawerWidth,
//         flexShrink: 0,
//     },
//     drawerPaper: {//what's inside the drawer
//         width: drawerWidth,
//         backgroundColor: theme.colors.dark,
//         borderRight: "1px solid " + theme.colors.mid,
        
//     },
//   }));

const DrawerContainer = styled.div`
    display:flex;
    flex-direction: column;
    /* justify-content: center; */
    
    overflow-x: hidden;
    color: ${ props => props.theme.colors.light};
    height: 100vh;
    box-sizing: border-box;
    width: 100%;
    padding: 1em 0px;
    background-color: #1e2126;
   
`;
const Title = styled.div`
    font-size: 1.2em;
    width: 100%;
    max-height: 3em;
    background-color: green;
    white-space: nowrap;
    text-align: center;
  
`;
const List = styled.ul`
    margin:0;
    padding:0;
    width: 100%;
    list-style-type: none;
    & li{
        padding:0;
        margin:0;
        width:100%;
        /* display:flex;
        justify-content: center;
        align-items: center; */
        & *{
            width:100%;
        }
        
    }
`;
export function OnlineUsers(props) {
   
    const { yourID } = useContext(ClientContext);
    const callPeer = props.callPeer;
    const users = props.users;

    return (
      
            <DrawerContainer>
                <Title>Online Users</Title>
                <List>
                    {Object.keys(users).map(key => {
                        
                        if (key === yourID) {
                            return null;
                        }
                        return (
                            <li key={key}>
                                <User name={users[key]}  callPeer={() => callPeer(key)} className="user" ></User>
                            </li>
                           
                            
                        );
                    })}
                </List>
            </DrawerContainer>
       
    )
}

export default withTheme(OnlineUsers)