import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import searchReducer from './filterList/reducer';
import searchSaga from './filterList/saga';

const rootReducer = combineReducers({
  searchReducer,
});

export function* rootSaga() {
  yield all([fork(searchSaga)]);
}

export default rootReducer;
