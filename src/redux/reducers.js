import {SET_EVENT_FILTER, TOGGLE_EASTERN_TIME} from "./actionTypes";
import {combineReducers} from 'redux';
import EventFilterEnum from "../components/schedule/EventFilterEnum"; //Maybe move to utils

function isEasternTime(state = false, action) {
    switch (action.type) {
        case TOGGLE_EASTERN_TIME:
            return !state;
        default:
            return state;
    }
}

function eventFilter(state = EventFilterEnum.UPCOMING, action) {
    switch (action.type) {
        case SET_EVENT_FILTER:
            return action.eventFilter;
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    isEasternTime,
    eventFilter,
});