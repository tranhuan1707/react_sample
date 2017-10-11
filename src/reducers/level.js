import * as actionTypes from '../helper/actionconst/actionTypes';

const INITIAL_STATE = {
  // user: null,
  loading: false
};

export default function level(state = {}, action) {
  if (state === null) { // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case actionTypes.LEVEL_START:
      return {
        ...state,
        loading: true,
        level: null,
      };
    case actionTypes.LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        level: action.payload.data,
      };
    case actionTypes.LEVEL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        level: null,
      };
    default:
      return state;
  }
}
