import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../components/redux/actions/courseActions";
import * as authorActions from "../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
//import { loadAuthors } from "./../redux/actions/authorActions";

const CoursesPage = (props) => {
  useEffect(() => {
    //debugger;
    const { courses, authors, actions } = props;
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Load Courses failed " + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Load Authors failed " + error);
      });
    }
  }, []);

  const [state, setState] = useState({ redirectToAddCoursePage: false });

  return (
    <>
      {state.redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary add-course"
        onClick={() => setState({ redirectToAddCoursePage: true })}
      >
        Add Course
      </button>
      <CourseList courses={props.courses} />
    </>
  );
};

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequiredisRequired,
};

function mapStateToProps(state) {
  //debugger;
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
