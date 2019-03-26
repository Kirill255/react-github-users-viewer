import React, { Component } from "react";
import { connect } from "react-redux";
import Picker from "../components/Picker";
import UserList from "../components/UserList";

import { fetchUsers, selectLanguage } from "../actions";

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
    const { users, selectedLanguage, isFetching } = this.props;

    return (
      <div>
        <Picker value={selectedLanguage} options={LANGUAGES} onChange={this.handleLanguageChange} />

        {isFetching ? "Loading..." : <UserList users={users} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);

  return {
    users: state.users.items,
    isFetching: state.users.isFetching,
    selectedLanguage: state.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLanguageSelect: (language) => dispatch(selectLanguage(language)),
    onFetchUsers: (language) => dispatch(fetchUsers(language))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
