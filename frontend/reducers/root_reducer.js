const { combineReducers } = require("redux");
import entitiesReducer from './entites_reducer';
import errorsReducer from './errors_reducer';
import sessionReducer from './session_reducer';
import themeReducer from './theme_reducer';

const rootReducer = combineReducers({
    entities: entitiesReducer,
    errors: errorsReducer,
    session: sessionReducer,
    theme: themeReducer
});

export default rootReducer;