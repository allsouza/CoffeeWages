import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        width: 240,
        marginBottom: 12,
        marginRight: 6
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ReviewShow({ review }) {
    const classes = useStyles();
    
    return (
        <Card className={classes.card} raised={true} key={review.id}>
            <CardContent>
                <Typography className={classes.pos} color="textSecondary">
                    A {review.position} review for {review.shopName} in {review.location}
                </Typography>
                <Typography variant="h5" component="h2">
                    Wage: {review.wage} per {review.payFrequency === "Hourly" ? "hour" : "year"} {review.tips ? " + tips" : ""}
                    <br />
                    {review.benefits}
                </Typography>
                <Typography variant="body2" component="p">
                    {review.notes}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Worked here from {review.startDate} to {review.endDate}
                </Typography>
            </CardContent>
        </Card>
    );
}
