import React from 'react'
import Anime, {anime} from 'react-anime';
import { makeStyles } from '@material-ui/core/styles';
import { FullscreenExit } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    box: {
      backgroundColor: theme.colors.accent,
      height: 50,
      width:50,
      overflow: "visable",

    },
    red: {
        backgroundColor: "red",
        height: 50,
        width:50,
        borderRadius: "50%"
    },
    green: {
        backgroundColor: "green",
        height: 50,
        
        borderRadius: "50%"
    },
    grid:{
        
        display: "grid",
        gridTemplateColumns: 'repeat(7, 1fr)',
        gridGap: theme.spacing(5),

    }
  }));

export default function Loading() {
    
    const classes = useStyles();
    const boxes = []
    const row = 5;
    const col = 14;
    for(var i=0; i++; i<row*col){
        boxes.push();
    }
    console.log(boxes);
    return (

        <div className={classes.grid}>
            <Anime 
                className={classes.box}
                loop={true}
                delay={anime.stagger(100, {grid: [14, 5], from: 'center'})}
                scale= {[
                    {value: .1, easing: 'easeOutSine', duration: 500},
                    {value: 1, easing: 'easeInOutQuad', duration: 1200}
                ]}
        
                backgroundColor="#FFF"
            >
        
                

        <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>

                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>

                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>

                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>

                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
                <div className={classes.box}/>
            </Anime>
        </div>
    )
}
