import * as actionTypes from "./action_types";

const initState = {
  data: null,
  isLoading: false,
  isFetched: false
};

const handleStates = {
  [actionTypes.ACTION_POSTS_GET_POST]: state => {
    return {
      ...state,
      isLoading: true,
      isFetched: false
    };
  },
  [actionTypes.ACTION_POSTS_GET_POST_RESULT]: (state, action) => {
    return {
      ...state,
      data: action.response,
      isLoading: false,
      isFetched: true
    };
  },
  [actionTypes.ACTION_POSTS_GET_POST_ERROR]: state => {
    return {
      ...state,
      isLoading: false
    };
  }
};

const reducer = (state, action) => {
  let _state = state;
  if (typeof state === "undefined") {
    _state = initState;
  }
  if (typeof handleStates[action.type] === "function") {
    return handleStates[action.type](_state, action);
  }
  return _state;
};

export default reducer;
