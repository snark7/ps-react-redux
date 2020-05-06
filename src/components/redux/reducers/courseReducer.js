import * as actionType from "../actions/actionTypes";
import initialState from "./initialState";
export default function courseReducer(state = initialState.courses, action) {
  //debugger;
  switch (action.type) {
    case actionType.CREATE_COURSE_SUCCESS:        
      return [...state, { ...action.course }];
    case actionType.LOAD_COURSES_SUCCESS:
      return action.courses;
    case actionType.UPDATE_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    default:
      return state;
  }
}
