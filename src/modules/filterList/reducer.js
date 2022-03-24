import {
  GET_SEARCH,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_FAIL,
  RESET_SEARCH,
  CLOSE_SEARCHLIST,
} from './action';

const intialState = {
  isLoading: false,
  isOpen: false,
  filteredList: [],
  error: '',
};

const searchReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_SEARCH:
      return { ...state, isLoading: true, isOpen: true };
    case GET_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isOpen: true,
        filteredList: action.newList,
      };
    case GET_SEARCH_FAIL:
      return { ...state, isLoading: false, isOpen: false, error: action.error };
    case RESET_SEARCH:
      return { ...state, isLoading: false, isOpen: false, filteredList: [] };
    case CLOSE_SEARCHLIST:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default searchReducer;
