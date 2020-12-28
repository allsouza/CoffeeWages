const { combineReducers } = require("redux");
import businessesReducer from './businesses_reducer';
import reviewsReducer from './reviews_reducer'
import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
    reviews: reviewsReducer,
    businesses: businessesReducer,
    users: usersReducer
})

export default entitiesReducer