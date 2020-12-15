import React ,{useContext} from 'react'
import { makeStyles, useTheme} from '@material-ui/core/styles'
import {ClientContext} from '../../contexts/ClientContext'
import User from './User';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';


const drawerWidth = 240;

const useStyles = makeStyles((theme) =>({
    drawerContainer: {
        overflow: 'auto',
        color: theme.colors.light,
        height: '100%',
    },
    title:{
        margin: '10 0 0 0',
        paddingLeft: 30,
        borderBottom: '1px solid #cddfe7',
        paddingBottom: 10,
    },
    drawer: {//drawer
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {//what's inside the drawer
        width: drawerWidth,
        backgroundColor: theme.colors.dark,
        borderRight: "1px solid " + theme.colors.mid,
        
    },
  }));
export default function OnlineUsers(props) {
    const theme = useTheme();
   
    const { yourID } = useContext(ClientContext);
    const callPeer = props.callPeer;
    const users = props.users;
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            {/* this toolbar on it's own makes space for one "line" */}
            {/* Thisi s necessary because otherwise the header would cover it. */}
            <Toolbar/> 
            <Toolbar/>
            <div className={classes.drawerContainer} id="active-user-container">
                <div className={classes.title}>
                    <h5 variant='h5'>Active Users</h5>
                </div>
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
            </div>
        </Drawer>
    )

    
//   .active-users-panel {
//     width: 300px;
//     height: 100%;
//     border-right: 1px solid #cddfe7;
//   }
  
//   .panel-title {
//     margin: 10px 0 0 0;
//     padding-left: 30px;
//     font-weight: 500;
//     font-size: 18px;
//     border-bottom: 1px solid #cddfe7;
//     padding-bottom: 10px;
//   }
  
//   .active-user {
//     padding: 10px 30px;
//     border-bottom: 1px solid #cddfe7;
//     cursor: pointer;
//     user-select: none;
//   }
  
//   .active-user:hover {
//     background-color: #e8e9eb;
//     transition: background-color 0.5s ease;
//   }
  
//   .active-user--selected {
//     background-color: #fff;
//     border-right: 5px solid #65a9e5;
//     font-weight: 500;
//     transition: all 0.5s ease;
//   }
}
