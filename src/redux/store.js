import {createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {rootReducer} from "./reducers";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: '@IvyFilmFestivalStore:',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);