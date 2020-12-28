const { combineReducers } = require("redux");
import entitiesReducer from './entites_reducer'
import errorsReducer from './errors_reducer';
import sessionReducer from './session_reducer';

const rootReducer = combineReducers({
    entities: entitiesReducer,
    errors: errorsReducer,
    session: sessionReducer
})

export default rootReducer