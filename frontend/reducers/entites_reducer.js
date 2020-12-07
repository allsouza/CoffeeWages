const { combineReducers } = require("redux");
import businessesReducer from './businesses_reducer';
import reviewsReducer from './reviews_reducer'

const entitiesReducer = combineReducers({
    reviews: reviewsReducer,
    businesses: businessesReducer
})

export default entitiesReducer