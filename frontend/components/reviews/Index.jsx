import React, { useEffect } from 'react';
import Review from './Show';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllReviews } from '../../actions/review_actions';
import ShopSearch from './ShopSearch';

export default function ReviewIndex() {
    const reviews = Object.values(useSelector(({entities}) => entities.reviews));
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadContent() {
            await dispatch(fetchAllReviews({ filters: { } }));
        }

        loadContent();
    }, []);

    return (
        <div>
            <ShopSearch />
            {reviews ? reviews.map(review => <Review key={review.id} review={review} />) : <div>Loading...</div> }  
        </div>
    )
}