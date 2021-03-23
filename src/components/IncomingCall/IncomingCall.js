import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {ClientContext} from '../../contexts/ClientContext'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  modal: {
      color: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function IncomingCall() {
    const {
        users,
        receivingCall,
        callerId,
        acceptCall,
        notifyLeftCall,
        callAccepted
        
     
    } = useContext(ClientContext);
    const classes = useStyles();
    const caller = users[callerId];
    const open = receivingCall && !callAccepted;

   

    return (
        <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={notifyLeftCall}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">{caller} is calling me</h2>
                    <p id="transition-modal-description">react-transition-group animates me.</p>
                    <Button onClick={()=>{acceptCall()}}variant="contained" color="primary">
                        Accept Call
                    </Button>
                    <Button onClick={()=>{notifyLeftCall()}}variant="contained" color="secondary">
                        Deny Call
                    </Button>
                </div>
            </Fade>
        </Modal>
        </div>
    );
}