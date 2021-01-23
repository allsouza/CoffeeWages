import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../actions/review_actions';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOn';
import TollTwoToneIcon from '@material-ui/icons/TollTwoTone';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FastfoodIcon from '@material-ui/icons/Fastfood';
// import Graphs from '../chart/chart';


export default function ReviewShow({ review, setModal, avgWage, avgSalary, expanded=false }) {
    const useStyles = makeStyles({
        card: {
            marginBottom: 12,
            margin: 6,
            cursor: 'pointer',
            transition: 'transform .3s',
            
            '&:hover': {
                transform: 'scale(1.05, 1.05)'
            }
        },
        content: {
            width: expanded ? 800 : 675,
            height: 125,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
        },
        heading: {
            display: 'flex',
            flexDirection: 'column',
            width: 130,
            height: 140,
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            marginRight: 12,
            paddingRight: 12,
            paddingTop: 16,
            paddingBottom: 16,
            boxSizing: 'border-box',
            justifyContent: 'center'
        },
        cardExpanded: {
            marginBottom: 12,
            cursor: 'pointer',
            // transform: 'scale(1.5, 1.5)',
            textAlign: 'left',
            overflow: 'scroll'
        },
        compContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        wage: {
            display: 'flex',
            alignItems: 'center',
            '& *': {
                marginRight: 8
            }
        },
        title: {
            fontSize: 14,
        },
        date: {
            alignSelf: 'flex-end',
            fontSize: 11
        },
        pos: {
            fontSize: 12,
        },
        body: {
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginBottom: 6,
            marginTop: 6,
            width: 250
        },
        benefits: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        tips: {
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
        },
        bodyExpanded: {
            marginBottom: 12,
            marginTop: 12,
        }
    });
    const classes = useStyles();
    const user = useSelector( state => state.entities.users[state.session.id])
    const admin = Boolean(user) ? user.admin : false
    const dispatch = useDispatch()
    function color(payType) {
        const average = payType === "Hourly" ? avgWage : avgSalary 
        if (review.wage < average * 0.75) {
            return '#D2222D'
        } else if (review.wage >= average) {
            return '#238823'
        } else {
            return '#FFBF00'
        }
    }
    
    return (
    <div>
            <Card onClick={e => {
                if(e.target.classList.contains('fa-trash'))
                {
                    dispatch(deleteReview(review.id))
                }
                else{
                    if(!expanded) setModal()
                }}} 
                variant="outlined" className={expanded ? classes.cardExpanded : classes.card} key={review.id}>
                <CardContent className={classes.content}>
                    <div className={classes.heading}>
                        <Typography component="h1">
                            {review.shopName}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {review.position} <br /> {review.location}
                        </Typography>
                    </div>
                    <Typography variant="h5" component="h2">
                        <div className={classes.compContainer}>
                            <div className={classes.wage}>
                                <MonetizationOnOutlinedIcon htmlColor={color(review.payFrequency)} fontSize='inherit' /> 
                                {review.wage}/{review.payFrequency === "Hourly" ? "hr" : "yr"} 
                            </div>
                            <div className={classes.benefits}>
                                <div className={classes.tips}><TollTwoToneIcon htmlColor={review.tips ? '#ffd700' : '#808080'} /></div>
                                <div className={classes.tips}><FlightTakeoffIcon htmlColor={review.vacation ? '#303F9F' : '#808080'} /></div>
                                <div className={classes.tips}><FastfoodIcon htmlColor={review.comps ? '#A90409' : '#808080'} /></div>
                            </div>
                        </div>
                    </Typography>
                    <div>
                        <Typography className={expanded ? classes.bodyExpanded : classes.body} variant="body2" component="p">
                            {review.notes}
                        </Typography>
                        <Typography className={classes.date} color="textSecondary" gutterBottom>
                            Worked here from {review.startDate} to {review.endDate}
                        </Typography>
                    </div>
                </CardContent>
                {admin ? <i className="fas fa-trash"></i> : null}
            </Card>
            {/* <Graphs /> */}
             </div>
    );
}
