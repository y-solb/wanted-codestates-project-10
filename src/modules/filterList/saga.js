import { call, put, takeLatest, delay } from 'redux-saga/effects';
import search from '../../service/searchKeyword';
import {
  GET_SEARCH,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_FAIL,
  RESET_SEARCH,
  CLOSE_SEARCHLIST,
} from './action';

const TIME = 60 * 1000;

function checkExpireTime() {
  Object.keys(localStorage).forEach((key) => {
    const value = JSON.parse(localStorage.getItem(key));
    if (Date.now() > value.expireTime) {
      localStorage.removeItem(key);
    }
  });
}

function* searchRequest(action) {
  yield put({ type: RESET_SEARCH });
  yield delay(500);

  if (action.keyword.length > 0) {
    checkExpireTime();
    const localStorageData = localStorage.getItem(action.keyword);

    if (localStorageData) {
      yield put({
        type: GET_SEARCH_SUCCESS,
        newList: JSON.parse(localStorageData).filteredList,
      });
    } else {
      try {
        const response = yield call(search, action.keyword);
        const newList = response.data.slice(0, 7);
        const value = {
          filteredList: newList,
          expireTime: Date.now() + TIME,
        };
        localStorage.setItem(action.keyword, JSON.stringify(value));
        yield put({
          type: GET_SEARCH_SUCCESS,
          newList,
        });
      } catch (error) {
        yield put({ type: GET_SEARCH_FAIL, error: error.response.data });
      }
    }
  } else {
    yield put({ type: RESET_SEARCH });
    yield put({ type: CLOSE_SEARCHLIST });
  }
}

export default function* searchSaga() {
  yield takeLatest(GET_SEARCH, searchRequest);
}
