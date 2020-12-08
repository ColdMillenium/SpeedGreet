import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';

export default function User(props) {
    const theme = useTheme();
    const useStyles = makeStyles({
        user:{
            padding: 5,
            margin: 2,
            color: "white"
        },

    });
    const classes = useStyles();
    const name = props.name;
    return (
            <Grid className={classes.user} container spacing={2} align="center" justify="center">
                <Grid item><AccountCircleIcon/></Grid>
                <Grid item>{props.name}</Grid> 
            </Grid>
    )
}
