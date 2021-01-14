// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware'

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ promise, reduxThunk, sagaMiddleware];

export function configureStore(initialState: {}) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));
    sagaMiddleware.run(sagas);
    return store;
}

