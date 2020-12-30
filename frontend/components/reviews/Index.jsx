import React, { useState, useEffect } from 'react';
import Review from './Show';
import FiltersDrawer from './FiltersDrawer';
import ShopSearch from './ShopSearch';
import Modal from './Modal';
import { useSelector } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { median } from '../../util/number_util';
import { LinearProgress } from '@material-ui/core';

export default function ReviewIndex() {
    const reviews = Object.values(useSelector(({entities}) => entities.reviews));
    const [displayedReviews, setDisplayedReviews] = useState([]);
    const [avgWage, setAvgWage] = useState();
    const [medianWage, setMedianWage] = useState();
    const [omitted, setOmitted] = useState();
    const [modalReview, setModalReview] = useState(false);
    const [searching, setSearching] = useState(false);
    const [ready, setReady] = useState(false)
    
    function calcAvgAndMedian() {
        let sum = 0;
        let wages = [];
        let numOmitted = 0;
        for (let i = 0; i < displayedReviews.length; i++) {
            const review = displayedReviews[i];
            if (review.payFrequency === "Hourly") {
                sum += review.wage;
                wages.push(review.wage);
            } else {
                numOmitted += 1;
            }
        }

        setOmitted(numOmitted);
        setAvgWage(sum / (displayedReviews.length - numOmitted));
        setMedianWage(median(wages));
        if(displayedReviews.length > 0) setReady(true)
    }
    
    useEffect(() => {
        calcAvgAndMedian();
    }, [displayedReviews]);

    useDeepCompareEffect(() => {
        setDisplayedReviews(reviews);
    }, [reviews]);

    console.log(displayedReviews.length)
    return (
        ready ?
        <div className="reviews-index">
            {modalReview ? <Modal onClick={() => setModalReview(false)} review={modalReview} /> : '' }
            <FiltersDrawer displayedReviews={displayedReviews} setDisplayedReviews={setDisplayedReviews} />
            <div className='reviews-index-search'>
                {displayedReviews.length > 0 ? 
                <div className={'reviews-index-search-stats'}>
                    <div>Found <i>{displayedReviews.length}</i> results.</div>
                    <div>Average wage: <i>${avgWage.toFixed(2)}</i> per hour.</div>
                    <div>Median wage: <i>${medianWage}</i> per hour.</div>
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
            {searching ? <div>
                <p>Searching shops</p>
                <LinearProgress/>
            </div>: <ShopSearch setSearching={setSearching}/> }
        </div>
    )
}


