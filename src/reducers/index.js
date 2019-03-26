import { combineReducers } from "redux";
import { SELECT_LANGUAGE, REQUEST_USERS, RECEIVE_USERS } from "../constants";

const language = (state = "javascript", action) => {
  switch (action.type) {
    case SELECT_LANGUAGE:
      return action.language;

    default:
      return state;
  }
};

const users = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_USERS:
      return {
        ...state,
        isFetching: false,
        items: action.users
      };

    default:
      return state;
  }
};

// https://redux.js.org/advanced/async-actions#handling-actions
const usersByLanguage = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_USERS:
    case RECEIVE_USERS:
      return {
        ...state,
        [action.language]: users([action.language], action)
      };

    default:
      return state;
  }
};

export default combineReducers({ usersByLanguage, language });
