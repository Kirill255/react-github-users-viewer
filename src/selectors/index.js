import { createSelector } from "reselect";

export const getSelectedLanguage = (state) => state.language;

export const getUsersByLanguage = createSelector(
  (state) => state.usersByLanguage,
  getSelectedLanguage,
  (usersByLanguage, language) => usersByLanguage[language] || {}
);

export const isUsersFetching = createSelector(
  getUsersByLanguage,
  (users) => users.isFetching
);

export const getUsersItems = createSelector(
  getUsersByLanguage,
  (users) => users.items || []
);

export const getUsersError = createSelector(
  getUsersByLanguage,
  (users) => users.error
);
