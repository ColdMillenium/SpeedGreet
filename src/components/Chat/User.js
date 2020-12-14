import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DropDownMenu from '../Utils/DropDownMenu.js';

export default function User(props) {
    const theme = useTheme();
    const useStyles = makeStyles({
        user:{
            padding: 5,
            margin: 2,
            color: "white",
            width: '240px',
        },

    });
    
    const classes = useStyles();
    const name = props.name;
    const callPeer = props.callPeer;
    const [anchorEl, setAnchorEl] = React.useState(null);

    
    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);//this target our user object so the menu knows where to display
    };

    const handleCall = () => {
        callPeer();
        handleClose()
    };
    const handleChat = ()=>{
        //do something
        handleClose();
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const items = [
        {name:`Call ${name}`, onClick: handleCall},
        {name:`Chat ${name}`, onClick: handleChat}
    ]

    return (
        <DropDownMenu items={items}>
            <ListItem button onClick={handleUserClick} >
                <Grid className={classes.user} container spacing={2} align="center" justify="center">
                    <Grid item><AccountCircleIcon/></Grid>
                    <Grid item>{props.name}</Grid> 
                </Grid>
                
            </ListItem>
            {/* <Menu
                id="simple-menu"
                anchorEl={anchorEl} //looks for this anchor to figure out where to display
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleCall}>Invite {name} to call </MenuItem>
                <MenuItem onClick={handleChat}>Invite {name} to chat </MenuItem>
    
            </Menu> */}
        </DropDownMenu>
            
    )
}
