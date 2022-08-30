import {createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import apiReducer from './api';

const rootReducer = combineReducers({
    apiReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// lo mismo de siempre


// despues mete el redux en el index.js para que lo agarre todo!!!

export default function generateStore(){
    const store  = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}