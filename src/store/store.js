import { applyMiddleware, compose, legacy_createStore } from "redux";
//import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import { loggerMiddleware } from "./middleware/logger";

const persistConfig = {
    key: 'root',
    storage, //-> we cast the variable as the key name storage: 'storage'
    blacklist: ['user'] // what we don't want to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const middleWare = [process.env.NODE_ENV !== 'production  ' &&
    loggerMiddleware].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWare));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);