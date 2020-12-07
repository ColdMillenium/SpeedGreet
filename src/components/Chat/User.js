import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme} from '@material-ui/core/styles'

export default function User(props) {
    const theme = useTheme();
    const useStyles = makeStyles({
    
    });
    const classes = useStyles();
    const name = props.name;
    return (
        <div>
            <Grid container spacing={2} justify="center">
                <Grid item><AccountCircleIcon/></Grid>
                <Grid item>{props.name}</Grid> 
            </Grid>
        </div>
    )
}
