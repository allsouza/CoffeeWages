import { RECEIVE_ALL_REVIEWS, RECEIVE_REVIEW } from "../actions/review_actions";

export default function reviewsReducer(state={}, action) {
    Object.freeze(state)
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_REVIEWS:
            action.reviews.map(review => newState[review.id] = review)
            return newState
        case RECEIVE_REVIEW:
            newState[action.review.id] = action.review
            return newState           
        default:
            return state
    }
}