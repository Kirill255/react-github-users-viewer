import {
  SELECT_LANGUAGE,
  REQUEST_USERS,
  RECEIVE_USERS,
  ERROR_USERS,
  REFRESH_USERS
} from "../constants";

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
  users: data.data.items,
  receivedAt: Date.now()
});

export const errorUsers = (error, language) => ({
  type: ERROR_USERS,
  language,
  error: error
});

export const refreshUsers = () => ({
  type: REFRESH_USERS
});
