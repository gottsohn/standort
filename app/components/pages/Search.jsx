import React from 'react';
import TextField from 'material-ui/TextField';

import UserCard from '../shared/UserCard.jsx';
import PublicActions from '../../actions/PublicActions';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';
import firebase from '../../database';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.getSession = this.getSession.bind(this);
    this.userCard = this.userCard.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.state = {
      currentUser: null,
      users: [],
      searchResult: []
    };
  }

  componentDidMount() {
    PublicActions.setTitle('Search');
    SessionStore.listen(this.getSession);
    SessionActions.getSession();
    this.getAllUsers();
  }

  componentWillUnmount() {
    SessionStore.unlisten(this.getSession);
  }

  getAllUsers() {
    firebase.database.ref('users').once('value', (snap) => {
      let users = snap.val() || [];
      users = Object.keys(users).map(user => users[user]);
      this.setState({
        users: users,
        searchResult: users.length > 20 ? [].concat(users).splice(20) : users
      });
    });
  }

  getSession(state) {
    this.setState({
      currentUser: state.session
    });
  }

  handleKeyUp(e) {
    const value = e.target.value.trim();
    let searchResult = this.state.users
      .filter(user => user.name.match(new RegExp(value,'i')));

    PublicActions.setTitle(value ? `Searching for '${value}'`: 'Search');
    searchResult.splice(20);
    this.setState({
      searchResult: searchResult
    });
  }

  userCard(user) {
    return (
      <UserCard
          currentUser={this.state.currentUser}
          key={user.id}
          user={user}
      />
    );
  }

  render() {
    return (
      <div>
        <TextField
            floatingLabelText="Search users"
            fullWidth
            hintText="Type a name"
            name="search"
            onKeyUp={this.handleKeyUp}
        />
        <br/>
        <div>
        {
          this.state.searchResult.map(this.userCard)
        }
        </div>
      </div>
    );
  }
}
