import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: "auto",
        maxWidth: 500,
        marginBottom: 12,
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
        <Card className={classes.root} raised={true}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    A {review.position} review for {review.shopName} in {review.location}
                </Typography>
                <Typography variant="h5" component="h2">
                    Wage: {review.wage} per {review.payFrequency === "Hourly" ? "hour" : "year"} {review.tips ? " + tips" : ""}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {review.benefits}
                </Typography>
                <Typography variant="body2" component="p">
                    {review.notes}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
