import ReviewShow from './Show';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Graphs from '../chart/chart';


const useStyles = makeStyles({
    background: {
        display: 'flex',
        position: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100vw',
        background: 'rgba(0,0,0,.8)',
        top: 0,
        left: 0,
        zIndex: 1000,
    }
});

export default function ReviewModal({onClick, review, avgWage, displayedReviews}) {
    const classes = useStyles();
    return (
        <div onClick={onClick} className={classes.background}>
            <ReviewShow review={review} expanded={true}/>
            <Graphs review = {review} expanded={true} avgWage={avgWage} displayedReviews = {displayedReviews}/>
        </div>
    )

}