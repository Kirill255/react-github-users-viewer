import { SELECT_LANGUAGE, REQUEST_USERS, RECEIVE_USERS } from "../constants";
import api from "../api";

export const selectLanguage = (language) => ({
  type: SELECT_LANGUAGE,
  language
});

export const requestUsers = (language) => ({
  type: REQUEST_USERS,
  language
});

export const receiveUsers = (language, data) => ({
  type: RECEIVE_USERS,
  language,
  users: data.data.items
});

export const fetchUsers = (language) => (dispatch) => {
  dispatch(requestUsers(language));

  return api
    .getPopularUsersByLanguage(language)
    .then((data) => dispatch(receiveUsers(language, data)));
};

// helper
const shouldFetchPosts = (state, language) => {
  const users = state.usersByLanguage[language];

  if (users) {
    return false;
  } else {
    return true;
  }
};

export const fetchUsersIfNeeded = (language) => (dispatch, getState) => {
  // загрузить только если их ещё нет
  if (shouldFetchPosts(getState(), language)) {
    return dispatch(fetchUsers(language));
  }
};
