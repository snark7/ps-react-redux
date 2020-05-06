import * as actionType from "./actionTypes";
import * as courseApi from "../../../api/courseApi";


export function loadCoursesSuccess(courses) {
  return { type: actionType.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: actionType.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  debugger;
  return { type: actionType.CREATE_COURSE_SUCCESS, course };
}

export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}
