import React, { useState, useEffect } from 'react';
import Review from './Show';
import FiltersDrawer from './FiltersDrawer';
import ShopSearch from './ShopSearch';
import Modal from './Modal';
import { useSelector } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { median } from '../../util/number_util';


export default function ReviewIndex() {
    const reviews = Object.values(useSelector(({entities}) => entities.reviews));
    const [displayedReviews, setDisplayedReviews] = useState([]);
    const [avgWage, setAvgWage] = useState();
    const [avgSalary, setAvgSalary] = useState();
    const [medianWage, setMedianWage] = useState();
    const [medianSalary, setMedianSalary] = useState();
    const [omitted, setOmitted] = useState();
    const [modalReview, setModalReview] = useState(false);
    
    function calcAvgAndMedian() {
        let sumWages = 0;
        let wages = [];
        let sumSalaries = 0
        let salaries = []
        for (let i = 0; i < displayedReviews.length; i++) {
            const review = displayedReviews[i];
            if (review.payFrequency === "Hourly") {
                sumWages += review.wage;
                wages.push(review.wage);
            } else {
                sumSalaries += review.wage;
                salaries.push(review.wage);
            }
        }

        setAvgWage(sumWages / (wages.length));
        setMedianWage(median(wages));
        setAvgSalary(sumSalaries / (salaries.length));
        setMedianSalary(median(salaries));
    }
    
    useEffect(() => {
        calcAvgAndMedian();
    }, [displayedReviews]);

    useDeepCompareEffect(() => {
        setDisplayedReviews(reviews);
    }, [reviews]);

    return (
        reviews.length > 0 ?
        <div className="reviews-index">
            {modalReview ? <Modal onClick={() => setModalReview(false)} review={modalReview} avgWage={avgWage} avgSalary={avgSalary} displayedReviews={displayedReviews} /> : ''}
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
            <ShopSearch />
        </div>
    )
}


