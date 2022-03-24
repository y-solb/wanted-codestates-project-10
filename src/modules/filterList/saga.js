import { call, put, takeLatest, all, delay } from 'redux-saga/effects';
import search from '../../service/searchKeyword';
import {
  GET_SEARCH,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_FAIL,
  RESET_SEARCH,
} from './action';

function* searchRequest(action) {
  yield delay(500);

  if (action.keyword.length > 0) {
    const localStorageData = localStorage.getItem(action.keyword);

    if (localStorageData) {
      yield put({
        type: GET_SEARCH_SUCCESS,
        newList: JSON.parse(localStorageData).filteredList,
      });
    } else {
      const response = yield call(search, action.keyword);
      const TIME = 10000;
      const value = {
        filteredList: response.data.slice(0, 7),
        expireTime: Date.now() + TIME,
      };
      localStorage.setItem(action.keyword, JSON.stringify(value));
      try {
        yield put({
          type: GET_SEARCH_SUCCESS,
          newList: response.data.slice(0, 7),
        });
      } catch (error) {
        yield put({ type: GET_SEARCH_FAIL, error: error.response.data });
      }
    }
  } else {
    yield put({ type: RESET_SEARCH });
  }
}

function* waitSearchRequest() {
  yield takeLatest(GET_SEARCH, searchRequest);
}

export default function* searchSaga() {
  yield all([waitSearchRequest()]);
}
