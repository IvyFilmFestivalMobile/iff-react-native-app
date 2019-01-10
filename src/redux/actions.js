import {SET_EVENT_FILTER, TOGGLE_EASTERN_TIME} from './actionTypes';

export function toggleEasternTime() {
    return ({
        type: TOGGLE_EASTERN_TIME,
    });
}

export function setEventFilter(eventFilter) {
    return ({
        type: SET_EVENT_FILTER,
        eventFilter: eventFilter,
    });
}