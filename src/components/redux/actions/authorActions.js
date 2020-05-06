import * as actionType from "./actionTypes";
import * as authorApi from "../../../api/authorApi";
export function createAuthor(author) {
  //debugger;
  return { type: actionType.CREATE_AUTHOR, author: author };
}

export function loadAuthorsSuccess(authors) {
  return { type: actionType.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}
