import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Picker from "../components/Picker";
import UserList from "../components/UserList";

import { fetchUsersIfNeeded, selectLanguage } from "../actions";

import "./App.css";

const LANGUAGES = [
  "javascript",
  "java",
  "python",
  "css",
  "php",
  "c++",
  "c#",
  "c",
  "shell",
  "objective-c",
  "go",
  "perl"
];

class App extends Component {
  componentDidMount() {
    const { selectedLanguage, onFetchUsers } = this.props;

    onFetchUsers(selectedLanguage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedLanguage !== this.props.selectedLanguage) {
      const { selectedLanguage, onFetchUsers } = nextProps;

      onFetchUsers(selectedLanguage);
    }
  }

  handleLanguageChange = (language) => {
    const { onLanguageSelect } = this.props;

    onLanguageSelect(language);
  };

  render() {
    const { users, selectedLanguage, isFetching, error } = this.props;

    if (error) {
      return (
        <div className="app">
          <div className="app__error">{error}</div>
        </div>
      );
    }

    return (
      <div className="app">
        <Picker value={selectedLanguage} options={LANGUAGES} onChange={this.handleLanguageChange} />

        <div className="app__content">
          {isFetching ? (
            <Loader type="CradleLoader" color="#00BFFF" height="100" width="100" />
          ) : (
            <UserList users={users} />
          )}
        </div>
      </div>
    );
  }
}

const getUsersByLanguage = (state) => {
  return state.usersByLanguage[state.language] || {};
};

const mapStateToProps = (state) => {
  console.log(state);
  const users = getUsersByLanguage(state);

  return {
    users: users.items || [],
    isFetching: users.isFetching,
    selectedLanguage: state.language,
    error: users.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLanguageSelect: (language) => dispatch(selectLanguage(language)),
    onFetchUsers: (language) => dispatch(fetchUsersIfNeeded(language))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
