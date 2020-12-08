import { RECEIVE_ALL_BUSINESSES, RECEIVE_BUSINESS } from "../actions/business_action";

export default function businessesReducer(state={}, action) {
    Object.freeze(state)
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_BUSINESSES:
            action.businesses.map(business => newState[business.id] = business)
            return newState   
        case RECEIVE_BUSINESS:
            newState[action.business.id] = action.business
            return newState    
        default:
            return state
    }
}