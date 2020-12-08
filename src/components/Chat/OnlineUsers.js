import React ,{useContext} from 'react'
import { makeStyles, useTheme} from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";
import {ClientContext} from '../../contexts/ClientContext'
import Grid from '@material-ui/core/Grid';
import User from './User';


export default function OnlineUsers(props) {
    const theme = useTheme();
    const useStyles = makeStyles({
        activeUsersPanel: {
            width: 300,
            height: '100%',
            borderRight: "1px solid #cddfe7"
        },
        title:{
            margin: '10 0 0 0',
            paddingLeft: 30,
            borderBottom: '1px solid #cddfe7',
            paddingBottom: 10
        }
      });
    const { yourID } = useContext(ClientContext);
    const handleClick = props.handleClick;
    const users = props.users;
    const classes = useStyles();

    return (
        <div className={classes.activeUsersPanel} id="active-user-container">
            <div className="panel-title">
                <Typography variant='h5'>Active Users</Typography>
            </div>
            <Grid container direction="column" alignItems="stretch">
                {Object.keys(users).map(key => {
                    if (key === yourID) {
                        return null;
                    }
                    return (
                        <Grid item  key={key}  onClick={() => handleClick(key)}>
                            <User name={users[key]}  className="user" ></User>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
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
