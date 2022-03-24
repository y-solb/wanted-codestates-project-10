export const GET_SEARCH = 'GET_SEARCH';
export const GET_SEARCH_SUCCESS = 'GET_SEARCH_SUCCESS';
export const GET_SEARCH_FAIL = 'GET_SEARCH_FAIL';
export const RESET_SEARCH = 'RESET_SEARCH';
export const SET_KEYWORD = 'SET_KEYWORD';

export const getSearch = (keyword) => ({
  type: GET_SEARCH,
  keyword,
});

export const getSearchSuccess = (newList) => ({
  type: GET_SEARCH_SUCCESS,
  newList,
});

export const getSearchFail = (error) => ({
  type: GET_SEARCH_FAIL,
  error,
});

export const resetSearch = () => ({
  type: RESET_SEARCH,
});
