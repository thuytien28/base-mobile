
/*************************
 * Copyright (c) 2020-present HOA, Inc. All Rights Reserved
 * See LICENSE.txt for license information.
 *************************/

import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import thunk from 'redux-thunk';

import hoa from 'hoa-redux/reducers';

import devTools from 'remote-redux-devtools';

const rootReducer = combineReducers({
    hoa,
});

const devToolsEnhancer =
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? // eslint-disable-line no-underscore-dangle
        window.__REDUX_DEVTOOLS_EXTENSION__ : // eslint-disable-line no-underscore-dangle
        () => {
            return devTools({
                name: 'hoa-mobile',
                hostname: 'localhost',
                port: 5678,
                realtime: true,
            });
        };

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['view', 'entities', 'requests'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(thunk), devToolsEnhancer()),
);
const persistor = persistStore(store);

export {store, persistor};
