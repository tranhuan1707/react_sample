import * as actionTypes from '../helper/actionconst/actionTypes';

const INITIAL_STATE = {
  // user: null,
  loading: false
};

export default function result(state = {}, action) {
  if (state === null) { // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case actionTypes.RESULT_POST_START:
      return {
        ...state,
        loading: true,
        result: null,
      };
    case actionTypes.RESULT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload,
      };
    case actionTypes.RESULT_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        result: null,
      };
    case actionTypes.RESULT_GET_START:
      return {
        ...state,
        loading: true,
        result: null,
      };
    case actionTypes.RESULT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload.data,
      };
    case actionTypes.RESULT_GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        result: null,
      };
    default:
      return state;
  }
}
