import { GET_SEARCH, GET_SEARCH_SUCCESS, GET_SEARCH_FAIL } from './action';

const intialState = {
  filteredList: [],
  loading: false,
  error: '',
};

const searchReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_SEARCH:
      return { ...state, loading: true };
    case GET_SEARCH_SUCCESS:
      return { ...state, loading: false, filteredList: action.newList };
    case GET_SEARCH_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default searchReducer;
