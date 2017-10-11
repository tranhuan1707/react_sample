import * as actionTypes from '../helper/actionconst/actionTypes';

const INITIAL_STATE = {
  // user: null,
  loading: false
};

export default function course(state = {}, action) {
  if (state === null) { // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case actionTypes.COURSE_START:
      return {
        ...state,
        loading: true,
        course: null,
      };
    case actionTypes.COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        course: action.payload,
      };
    case actionTypes.COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        course: null,
      };
    default:
      return state;
  }
}
