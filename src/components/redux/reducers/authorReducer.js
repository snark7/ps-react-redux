import * as actionType from "../actions/actionTypes";
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case actionType.CREATE_AUTHOR:
      //debugger;
      return [...state, { ...action.author }];
    case actionType.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}
