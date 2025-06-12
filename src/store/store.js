import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { logger } from "redux-logger";

import { rootReducer } from "./root-reducer";
import { loggerMiddleware } from "./middleware/logger";
import { thunk } from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart']
    // below was caching cats etc whitelist above means only the cart is cached
    //blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && loggerMiddleware, thunk].filter(Boolean);

// added to use chrome extension redux devtools
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// root-reducer 

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
