import Review from './Show';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

export default function ReviewModal({onClick, review}) {
    const classes = useStyles();

    return (
        <div onClick={onClick} className={classes.background}>
            <Review review={review} expanded={true} />
        </div>
    )

}