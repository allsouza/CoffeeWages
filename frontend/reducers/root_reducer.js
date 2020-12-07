const { combineReducers } = require("redux");
import entitiesReducer from './entites_reducer'

const rootReducer = combineReducers({
    entities: entitiesReducer
})

export default rootReducer