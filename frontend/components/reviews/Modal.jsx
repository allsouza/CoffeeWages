import ReviewShow from './Show';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Graphs from '../chart/chart';


const useStyles = makeStyles({
    background: {
        display: 'flex',
        flexDirection: 'column',
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

export default function ReviewModal({onClick, review, avgWage, avgSalary, displayedReviews}) {
    const classes = useStyles();
    return (
        <div onClick={onClick} className={classes.background}>
            <Graphs review = {review} expanded={true} avgSalary={avgSalary} avgWage={avgWage} displayedReviews={displayedReviews}/>
            <ReviewShow review={review} expanded={true}/>
        </div>
    )

}