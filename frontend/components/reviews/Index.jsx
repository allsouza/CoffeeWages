import React, { useState } from 'react';

import Review from './Show';
import FiltersDrawer from './filters_drawer';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';


export default function ReviewIndex() {
    const reviews = Object.values(useSelector(({entities}) => entities.reviews));

    return (
        <div className="reviews-index">
            <FiltersDrawer />
            <div className='reviews-index-search'>
                <div className='reviews-index-search-results'>    
                    {reviews ? reviews.map(review => <Review review={review} />) : <div>Loading...</div>   }
                </div>
            </div>
        </div>
    )
}


