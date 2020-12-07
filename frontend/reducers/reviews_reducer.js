import { RECEIVE_ALL_REVIEWS } from "../actions/review_actions";

export default function reviewsReducer(state={}, action) {
    Object.freeze(state)
    let newState;

    switch (action.type) {
        case RECEIVE_ALL_REVIEWS:
            action.reviews.map(review => newState[review.id] = review)
            return newState           
        default:
            return state
    }
}