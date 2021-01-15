import React, { useState, useEffect } from 'react';
import Review from './Show';
import FiltersDrawer from './FiltersDrawer';
import ShopSearch from './ShopSearch';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { median } from '../../util/number_util';
import TollTwoToneIcon from '@material-ui/icons/TollTwoTone';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { clearReviews } from '../../actions/review_actions';

export default function ReviewIndex() {
    const reviews = Object.values(useSelector(({ entities }) => entities.reviews));
    const [displayedReviews, setDisplayedReviews] = useState([]);
    const [avgWage, setAvgWage] = useState();
    const [avgSalary, setAvgSalary] = useState();
    const [medianSalary, setMedianSalary] = useState();
    const [medianWage, setMedianWage] = useState();
    const [modalReview, setModalReview] = useState(false);
    const [ready, setReady] = useState(false)
    const [reviewComp, setReviewComp] = useState([])
    const dispatch = useDispatch()
    
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
        setReviewComp(displayedReviews.map(review => { 
            return <Review 
                setModal={() => setModalReview(review)}
                review={review}
                key={review.id} 
                /> }))
        if(displayedReviews.length > 0){
            setReady(true)
        }
        else{
            setReviewComp(<div className='no-reviews'>
                <i className="fas fa-search"></i>
                <h1>There are no reviews to display for that search.  Please try a different search.</h1>
            </div>)
        }
    }, [displayedReviews]);

    useEffect(() => {
        return () => {
            dispatch(clearReviews())
        }
    }, [])

    useDeepCompareEffect(() => {
        setDisplayedReviews(reviews);
    }, [reviews]);

    return (
        ready ?
            <div className="reviews-index">
                {modalReview ? <Modal onClick={() => setModalReview(false)} review={modalReview} avgWage={avgWage} avgSalary={avgSalary} /> : ''}
                <FiltersDrawer displayedReviews={displayedReviews} setDisplayedReviews={setDisplayedReviews} />
                <div className='reviews-index-search'>
                    {displayedReviews.length > 0 ?
                        <div className={'reviews-index-search-stats'}>
                            <div>
                                <div>Average wage: <i>${avgWage.toFixed(2)}</i> per hour.</div>
                                <div>Median wage: <i>${medianWage}</i> per hour.</div>
                                {<div className='reviews-index-search-stats-omitted'>Data from <i>{displayedReviews.length}</i> results</div>}
                            </div>
                            <div>
                                <div><TollTwoToneIcon htmlColor='#ffd700' /> Tips</div>
                                <div><FlightTakeoffIcon htmlColor='#303F9F' /> Paid vacation</div>
                                <div><FastfoodIcon htmlColor='#A90409' /> Meal comps</div>
                            </div>
                        </div> : ""
                    }
                    <div className='reviews-index-search-results'>
                        {reviews.map(review => displayedReviews.includes(review) ?
                            <Review
                                setModal={() => setModalReview(review)}
                                review={review}
                                avgWage={avgWage}
                                avgSalary={avgSalary}
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


