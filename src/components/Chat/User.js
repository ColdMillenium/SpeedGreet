import React , {useContext} from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DropDownMenu from '../Utils/DropDownMenu.js';
import styled ,{ withTheme} from 'styled-components';
import {ClientContext} from '../../contexts/ClientContext'

const DropDownStyle ={
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: "blue"
}

const Body = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin: 0;
    &:hover{
        background-color: ${props => props.theme.colors.accent}
    }
`;
const UserLayout = styled.div`
   
    display:grid;
    grid-template-areas: 
    "icon name";
    justify-content: center;
    align-content: center;
    grid-column-gap: 1em;
   
  
`;
const IconContainer = styled.div`
    grid-area: icon;
    display: flex;
    align-items: center;
   
`;
const UserName = styled.div`
    grid-area: name;
    text-align:left;
    display: flex;
    align-items: center;
`;
    

function User(props) {
    const name = props.name;
    const callPeer = props.callPeer;
    const userId = props.userId;
    const {setChatUser } = useContext(ClientContext);
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
        setChatUser(userId);
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
            {/* <ListItem button onClick={handleUserClick} >
                <Grid className={classes.user} container spacing={2} align="center" justify="center">
                    <Grid item><AccountCircleIcon/></Grid>
                    <Grid item>{props.name}</Grid> 
                </Grid>
                
            </ListItem> */}
                <Body>
                    
                    <UserLayout>
                        <IconContainer>
                            <AccountCircleIcon/>
                        </IconContainer>
                        <UserName>
                            {props.name}
                        </UserName>
                    </UserLayout>

                    
                    
                </Body>
                
           
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

export default withTheme(User);