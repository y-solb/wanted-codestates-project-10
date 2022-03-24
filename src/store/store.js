import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer, { rootSaga } from '../modules';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
