import * as actionTypes from '../helper/actionconst/actionTypes';

const INITIAL_STATE = {
  // user: null,
  loading: false
};

export default function profile(state = {}, action) {
  if (state === null) { // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case actionTypes.PROFILE_START:
      return {
        ...state,
        loading: true,
        profile: null,
      };
    case actionTypes.PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: action.payload.data,
      };
    case actionTypes.LESSONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        profile: null,
      };
    default:
      return state;
  }
}
