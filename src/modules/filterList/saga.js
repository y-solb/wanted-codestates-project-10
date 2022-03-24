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
    const response = yield call(search, action.keyword);
    try {
      yield put({
        type: GET_SEARCH_SUCCESS,
        newList: response.data.slice(0, 7),
      });
    } catch (error) {
      yield put({ type: GET_SEARCH_FAIL, error: error.response.data });
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
