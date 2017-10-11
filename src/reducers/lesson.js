import * as actionTypes from '../helper/actionconst/actionTypes';

const INITIAL_STATE = {
  // user: null,
  loading: false
};

export default function lesson(state = {}, action) {
  if (state === null) { // server doesn't support state = {}
    return INITIAL_STATE;
  }
  switch (action.type) {
    case actionTypes.LESSON_START:
      return {
        ...state,
        loading: true,
        lesson: null,
      };
    case actionTypes.LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        lesson: action.payload.data,
      };
    case actionTypes.LESSON_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        lesson: null,
      };
    default:
      return state;
  }
}
