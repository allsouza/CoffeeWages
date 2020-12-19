import React, { useState, useEffect } from 'react';
import Review from './Show';
import FiltersDrawer from './filters_drawer';
import ShopSearch from './ShopSearch';
import Modal from './Modal';
import { useSelector } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';

export default function ReviewIndex() {
    const reviews = Object.values(useSelector(({entities}) => entities.reviews));
    const [displayedReviews, setDisplayedReviews] = useState([]);
    const [avgWage, setAvgWage] = useState();
    const [omitted, setOmitted] = useState();
    const [modalReview, setModalReview] = useState(false);
    
    function calcAvgHourlyWage() {
        let sum = 0;
        let numOmitted = 0;
        for (let i = 0; i < displayedReviews.length; i++) {
            const review = displayedReviews[i];
            review.payFrequency === "Hourly" ? sum += review.wage : numOmitted += 1;
        }
        setOmitted(numOmitted);
        setAvgWage(sum / (displayedReviews.length - numOmitted));
    }
    
    useEffect(() => {
        calcAvgHourlyWage();
    }, [displayedReviews]);

    useDeepCompareEffect(() => {
        setDisplayedReviews(reviews);
    }, [reviews]);

    return (
        reviews.length > 0 ?
        <div className="reviews-index">
            {modalReview ? <Modal onClick={() => setModalReview(false)} review={modalReview} /> : '' }
            <FiltersDrawer displayedReviews={displayedReviews} setDisplayedReviews={setDisplayedReviews} />
            <div className='reviews-index-search'>
                {displayedReviews.length > 0 ? 
                <div className={'reviews-index-search-stats'}>
                    <div>Found <i>{displayedReviews.length}</i> results with an average wage of <i>{avgWage.toFixed(2)}</i> per hour:  </div>
                            {omitted > 0 ? <div className='reviews-index-search-stats-omitted'>*Omitted <i>{omitted}</i> salaried results from calculation</div> : ''}           
                </div> : ""
                }
                <div className='reviews-index-search-results'>    
                        {reviews.map(review => displayedReviews.includes(review) ? 
                            <Review 
                                setModal={() => setModalReview(review)}
                                review={review}
                                key={review.id} 
                                /> : '')}
                </div>
            </div>
        </div>
        : 
        <div className="reviews-index">
            <ShopSearch />
        </div>
    )
}


