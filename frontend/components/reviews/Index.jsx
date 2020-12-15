import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Review from './Show';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllReviews } from '../../actions/review_actions';

export default function ReviewIndex() {
    const reviews = Object.values(useSelector(({entities}) => entities.reviews));
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        
        if (name || address) {
            dispatch(fetchAllReviews({filters: {name, address} }));
        }
    }

    return (
        <div className="reviews-index">
            <div className='search-bar'>
                <form onSubmit={handleSubmit} className='fields'>
                    <TextField value={name} onChange={e => setName(e.target.value)} label="Business name" />
                    <TextField value={address} onChange={e => setAddress(e.target.value)} label="Address" />
                    <Button type="submit" variant='contained' size="medium" color="primary">Search</Button>
                </form>
            </div>
            {reviews ? reviews.map(review => <Review review={review} />) : <div>Loading...</div>   }
        </div>
    )
}