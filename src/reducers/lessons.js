import * as actionTypes from '../helper/actionconst/actionTypes';

const INITIAL_STATE = {
  // user: null,
  loading: false
};

export default function lessons(state = {}, action) {
  if (state === null) { // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case actionTypes.LESSONS_START:
      return {
        ...state,
        loading: true,
        lessons: null,
      };
    case actionTypes.LESSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        lessons: action.payload.data,
      };
    case actionTypes.LESSONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        lessons: null,
      };
    default:
      return state;
  }
}
