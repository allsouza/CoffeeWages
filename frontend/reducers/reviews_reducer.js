import { CLEAR_REVIEWS, DELETE_REVIEW, RECEIVE_ALL_REVIEWS, RECEIVE_REVIEW } from "../actions/review_actions";

export default function reviewsReducer(state={}, action) {
    Object.freeze(state)
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_REVIEWS:
            newState = Object.assign({});
            action.reviews.map(review => newState[review.id] = review)
            return newState;
        case RECEIVE_REVIEW:
            return Object.assign({}, state, {[action.review.id]: action.review});
        case DELETE_REVIEW:
            delete newState[action.reviewId];
            return newState;
        case CLEAR_REVIEWS:
            return {}
        default:
            return state;
    }
}