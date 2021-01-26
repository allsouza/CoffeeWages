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
import { Button } from '@material-ui/core';
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
    const [pages, setPages] = useState(1)
    const [sort, setSort] = useState('');
    const [sortedReviews, setSortedReviews] = useState(displayedReviews)
    const dispatch = useDispatch()
    
    function calcAvgAndMedian() {
        let sumWages = 0;
        let wages = [];
        let sumSalaries = 0
        let salaries = []
        for (let i = 0; i < displayedReviews.length; i++) {
            const review = displayedReviews[i];
            if (review.wage<=40) {
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
        let sorted = [...displayedReviews];
        switch (sort) {
            case 'newest':
                sorted = sorted.sort((a,b) => a.updatedAt > b.updatedAt ? -1 : 1)
                break;
            case 'oldest':
                sorted = sorted.sort((a,b) => a.updatedAt < b.updatedAt ? -1 : 1)
                break;
            case 'shopAsc':
                sorted = sorted.sort((a,b) => a.shopName > b.shopName ? 1 : -1)
                break;
            case 'shopDes':
                sorted = sorted.sort((a,b) => a.shopName < b.shopName ? 1 : -1)
                break;
            case 'wageDes':
                sorted = sorted.sort((a,b) => a.wage > b.wage ? -1 : 1)
                break;
            case 'wageAsc':
                sorted = sorted.sort((a,b) => a.wage < b.wage ? -1 : 1)
                break;
            default:
                break;
        }
        setDisplayedReviews(sorted)
    }, [sort])

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
                {modalReview ? <Modal onClick={() => setModalReview(false)} review={modalReview} avgWage={avgWage} avgSalary={avgSalary} displayedReviews={displayedReviews} /> : ''}
                <FiltersDrawer setSort={setSort} sort={sort} displayedReviews={displayedReviews} setDisplayedReviews={setDisplayedReviews} />
                <div className='reviews-index-search'>
                    {displayedReviews.length > 0 ?
                        <div className={'reviews-index-search-stats'}>
                            <div>
                                <div>Average wage: <i>${avgWage.toFixed(2)}</i> per hour.</div>
                                <div>Median wage: <i>${medianWage.toFixed(2)}</i> per hour.</div>
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
                        {reviewComp.length > 1 ? reviewComp.slice(0, pages * 24) : reviewComp}
                    </div>
                    {pages * 24 < displayedReviews.length ? 
                    <Button variant="contained" color="primary" onClick={(() => setPages(pages + 1))}>Load More</Button>
                    : ""}
                </div>
            </div>
            :
            <div className="reviews-index">
                <ShopSearch setReady={setReady} />
            </div>
    )
}


