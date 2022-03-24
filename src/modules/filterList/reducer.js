import {
  GET_SEARCH,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_FAIL,
  RESET_SEARCH,
} from './action';

const intialState = {
  loading: false,
  isOpen: false,
  filteredList: [],
  error: '',
};

const searchReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_SEARCH:
      return { ...state, loading: true, isOpen: true };
    case GET_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isOpen: true,
        filteredList: action.newList,
      };
    case GET_SEARCH_FAIL:
      return { ...state, loading: false, isOpen: false, error: action.error };
    case RESET_SEARCH:
      return { ...state, loading: false, isOpen: false, filteredList: [] };
    default:
      return state;
  }
};

export default searchReducer;
