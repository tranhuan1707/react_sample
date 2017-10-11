import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import course from './course';
import lessons from './lessons';
import lesson from './lesson';
import profile from './profile';
import level from './level';
import levelMobile from './levelMobile';
import result from './result';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    user,
    runtime,
    course,
    lessons,
    lesson,
    profile,
    level,
    levelMobile,
    result
  });
}
