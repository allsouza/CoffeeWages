import React, { useEffect } from 'react';
import Review from './Show';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllReviews } from '../../actions/review_actions';

export default function ReviewIndex() {
    const reviews = Object.values(useSelector(({entities}) => entities.reviews));
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadContent() {
            await dispatch(fetchAllReviews({ filters: { } }));
        }

        loadContent();
    }, []);

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

    return (
        <div>
            <h1></h1>
            {reviews ? reviews.map(review => <Review key={review.id} review={review} />) : <div>Loading...</div>}
        </div>
    )
}