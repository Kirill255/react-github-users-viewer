export const getSelectedLanguage = (state) => state.language;
export const getUsersByLanguage = (state) => state.usersByLanguage[state.language] || {};
