import * as ReviewApiUtil from '../util/review_api_util';

export const RECEIVE_ALL_REVIEWS = "RECEIVE_ALL_REVIEWS";
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const CLEAR_REVIEWS = "CLEAR_REVIEWS"

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
});

const receiveReviews = reviews => ({
    type: RECEIVE_ALL_REVIEWS,
    reviews
});

const removeReview = reviewId => ({
    type: DELETE_REVIEW,
    reviewId
});

export function clearReviews() {
    return ({
        type: CLEAR_REVIEWS
    });
}

export const fetchAllReviews = (filters) => dispatch => {
    return ReviewApiUtil.fetchReviews(filters)
    .then(reviews => dispatch(receiveReviews(reviews)));
};

export const fetchFilteredReviews = (name, location) => dispatch => {
    return ReviewApiUtil.fetchBusinessReviews(name, location)
    .then(reviews => dispatch(receiveReviews(reviews)));
}

export const fetchShopReviews = (businessId) => dispatch => {
    return ReviewApiUtil.fetchShopReviews(businessId)
    .then(reviews => dispatch(receiveReviews(reviews)));
};

export const fetchReview = reviewId => dispatch => {
    return ReviewApiUtil.fetchReview(reviewId)
    .then(review => dispatch(receiveReview(review)));
};

export const createReview = review => dispatch => {
    return ReviewApiUtil.createReview(review)
    .then(review => dispatch(receiveReview(review)));
};

export const deleteReview = reviewId => dispatch => {
    return ReviewApiUtil.deleteReview(reviewId)
    .then(() => dispatch(removeReview(reviewId)));
};

export const updateReview = review => dispatch => (
    ReviewApiUtil.updateReview(review)
    .then(review => dispatch(receiveReview(review)))
);
