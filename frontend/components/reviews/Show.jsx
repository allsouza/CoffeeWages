import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../actions/review_actions';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles({
    card: {
        width: 240,
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
        maxHeight: '49vh',
        transform: 'scale(1.5, 1.5)',
        textAlign: 'left',
        overflow: 'scroll'
    },
    wage: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 8
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

export default function ReviewShow({ review, setModal, avgWage, avgSalary, expanded=false }) {
    const classes = useStyles();
    const user = useSelector( state => state.entities.users[state.session.id])
    const admin = Boolean(user) ? user.admin : false
    const dispatch = useDispatch()
    function color(payType) {
        const average = payType === "Hourly" ? avgWage : avgSalary 
        if (review.wage < average * 0.75) {
            return '#FFBF00'
        } else if (review.wage >= average) {
            return '#238823'
        } else {
            return '#D2222D'
        }
    }
    
    return (
            <Card onClick={e => {
                if(e.target.classList.contains('fa-trash'))
                {
                    dispatch(deleteReview(review.id))
                }
                else{
                    if(!expanded) setModal()
                }}} 
                variant="outlined" className={expanded ? classes.cardExpanded : classes.card} key={review.id}>
                <CardContent>
                    <Typography className={classes.pos} color="textSecondary">
                        {review.position} <br /> {review.shopName} <br /> {review.location}
                    </Typography>
                    <Typography variant="h5" component="h2" className={classes.wage}>
                        <MonetizationOnOutlinedIcon htmlColor={color(review.payFrequency)} fontSize='inherit' /> {review.wage}/{review.payFrequency === "Hourly" ? "hr" : "yr"} {review.tips ? " + tips" : ""}
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
                {admin ? <i className="fas fa-trash"></i> : null}
            </Card>
    );
}
