import * as actionTypes from '../helper/actionconst/actionTypes';

const INITIAL_STATE = {
  // user: null,
  loading: false
};

export default function user(state = {}, action) {
  if (state === null) { // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        user: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: null,
      };
    default:
      return state;
  }
}
