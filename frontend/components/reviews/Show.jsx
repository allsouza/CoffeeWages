import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        width: 240,
        minHeight: 275,
        maxHeight: 275,
        marginBottom: 12,
        margin: 6,
        cursor: 'pointer',
        transition: 'transform .3s',

        '&:hover': {
            transform: 'scale(1.05, 1.05)'
        }
    },

    cardExpanded: {
        width: 240,
        minHeight: 275,
        marginBottom: 12,
        cursor: 'pointer',
        maxHeight: 550,
        transform: 'scale(1.5, 1.5)',
        textAlign: 'left'
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    body: {
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom: 6,
        marginTop: 6
    },

    bodyExpanded: {
        marginBottom: 12,
        marginTop: 12,
        
    }
});

export default function ReviewShow({ review, setModal, expanded=false }) {
    const classes = useStyles();
    
    return (
        <div onClick={setModal}> 
            <Card variant="outlined" className={expanded ? classes.cardExpanded : classes.card} key={review.id}>
                <CardContent>
                    <Typography className={classes.pos} color="textSecondary">
                        {review.position} review for {review.shopName} in {review.location}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Wage: {review.wage} per {review.payFrequency === "Hourly" ? "hour" : "year"} {review.tips ? " + tips" : ""}
                        <br />
                        {review.benefits}
                    </Typography>
                    <Typography className={expanded ? classes.bodyExpanded : classes.body} variant="body2" component="p">
                        {review.notes}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Worked here from {review.startDate} to {review.endDate}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
