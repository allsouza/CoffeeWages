import React, { useState } from 'react';
import Review from './Show';
import FiltersDrawer from './filters_drawer';
import { useSelector } from 'react-redux';

export default function ReviewIndex() {
    const reviews = Object.values(useSelector(({entities}) => entities.reviews));
    const [displayedReviews, setDisplayedReviews] = useState([]);

    return (
        <div className="reviews-index">
            <FiltersDrawer displayedReviews={displayedReviews} setDisplayedReviews={setDisplayedReviews} />
            <div className='reviews-index-search'>
                {displayedReviews.length > 0 ? `${displayedReviews.length} results:` : ""}
                <div className='reviews-index-search-results'>    
                    {displayedReviews ? reviews.map(review => displayedReviews.includes(review) ? <Review key={review.id} review={review} /> : null) : <div>Loading...</div>   }
                </div>
            </div>
        </div>
    )
}


