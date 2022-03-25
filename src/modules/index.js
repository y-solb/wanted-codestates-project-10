import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import searchReducer from './filterList/reducer';
import searchSaga from './filterList/saga';

const rootReducer = combineReducers({
  searchReducer,
});

export function* rootSaga() {
  yield fork(searchSaga);
}

export default rootReducer;
