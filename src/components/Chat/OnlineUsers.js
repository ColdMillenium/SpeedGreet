import React ,{useContext} from 'react'
import { makeStyles, useTheme} from '@material-ui/core/styles'
import {ClientContext} from '../../contexts/ClientContext'
import User from './User';
import List from '@material-ui/core/List';
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
    overflow: auto;
    color: ${ props => props.theme.colors.light};
    height: 100vh;
    background-color: #1e2126;
`;
const Title = styled.div`
    display: flex;
    border-bottom: 1px solid #cddfe7;
    font-size: 1.2em;
    justify-content: center;
    align-items: center;
    padding: 1em;
`;
const Drawer = styled.div`
    width: ${() => drawerWidth};
    flex-shrink: 0px;
`;
const DrawerPaper = styled.div`
    width: ${() => drawerWidth};
    background-color: ${ props => props.theme.colors.dark};
    border-right: 1px solid  + ${ props => props.theme.colors.mid};
`;
export function OnlineUsers(props) {
   
    const { yourID } = useContext(ClientContext);
    const callPeer = props.callPeer;
    const users = props.users;

    return (
        <Drawer>
            {/* this toolbar on it's own makes space for one "line" */}
            {/* Thisi s necessary because otherwise the header would cover it. */}
            <DrawerContainer>
                <Title>Active Users</Title>
                <List container direction="column" alignItems="stretch">
                    {Object.keys(users).map(key => {
                        
                        if (key === yourID) {
                            return null;
                        }
                        return (
                            <div key={key}>
                                <User name={users[key]}  callPeer={() => callPeer(key)} className="user" ></User>
                            </div>
                           
                            
                        );
                    })}
                </List>
            </DrawerContainer>
        </Drawer>
    )
}

export default withTheme(OnlineUsers)