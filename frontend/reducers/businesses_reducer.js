import { RECEIVE_ALL_BUSINESSES } from "../actions/business_action";

export default function businessesReducer(state={}, action) {
    Object.freeze(state)
    let newState;

    switch (action.type) {
        case RECEIVE_ALL_BUSINESSES:
            action.businesses.map(business => newState[business.id] = business)
            return newState           
        default:
            return state
    }
}