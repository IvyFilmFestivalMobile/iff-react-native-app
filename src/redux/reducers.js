import {TOGGLE_EASTERN_TIME} from "./actionTypes";
import {combineReducers} from 'redux';

//TODO: use redux-persist for storage
function isEasternTime(state = false, action) {
    switch (action.type) {
        case TOGGLE_EASTERN_TIME:
            return !state;
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    isEasternTime,
});