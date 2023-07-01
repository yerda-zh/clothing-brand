import { applyMiddleware, compose, legacy_createStore } from "redux";
//import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import { loggerMiddleware } from "./middleware/logger";
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from "./root-saga";

const persistConfig = {
    key: 'root',
    storage, //-> we cast the variable as the key name storage: 'storage'
    whitelist: ['cart'] // what we want to persist
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);


const middleWare = [
    process.env.NODE_ENV !== 'production  ' && loggerMiddleware, 
    sagaMiddleware
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWare));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);