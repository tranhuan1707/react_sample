import * as actionTypes from '../helper/actionconst/actionTypes';

const INITIAL_STATE = {
  // user: null,
  loading: false
};

export default function levelMobile(state = {}, action) {
  if (state === null) { // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case actionTypes.LEVEL_MB_START:
      return {
        ...state,
        loading: true,
        levelMobile: null,
      };
    case actionTypes.LEVEL_MB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        levelMobile: action.payload.data,
      };
    case actionTypes.LEVEL_MB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        levelMobile: null,
      };
    default:
      return state;
  }
}
