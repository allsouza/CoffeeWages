import React, { useState, useEffect } from 'react';
import Review from './Show';
import FiltersDrawer from './filters_drawer';
import ShopSearch from './ShopSearch';
import { useSelector } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';

export default function ReviewIndex() {
    const reviews = Object.values(useSelector(({entities}) => entities.reviews));
    const [displayedReviews, setDisplayedReviews] = useState(reviews);
    
    useDeepCompareEffect(() => {
        setDisplayedReviews(reviews);
    }, [reviews]);

    return (
        reviews.length > 0 ?
        <div className="reviews-index">
            <FiltersDrawer displayedReviews={displayedReviews} setDisplayedReviews={setDisplayedReviews} />
            <div className='reviews-index-search'>
                {displayedReviews.length > 0 ? `${displayedReviews.length} results:` : ""}
                <div className='reviews-index-search-results'>    
                    {reviews.map(review => displayedReviews.includes(review) ? <Review review={review} key={review.id} /> : '')}
                </div>
            </div>
        </div>
        : 
        <div className="reviews-index">
            <ShopSearch />
        </div>
    )
}


