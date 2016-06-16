import React from 'react';
import TextField from 'material-ui/TextField';

import UserCard from '../shared/UserCard.jsx';
import PublicActions from '../../actions/PublicActions';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../actions/SessionStore';
import firebase from '../../database';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getSession = this.getSession.bind(this);
    this.state = {
      currentUser: null,
      searchValue: '',
      users: []
    };
  }

  componentDidMount() {
    PublicActions.setTitle('Search');
    SessionStore.listen(this.getSession);
    SessionActions.getSession();
  }

  getSession(state) {
    this.setState({
      currentUser: state.session
    });
  }

  handleKeyDown(e) {
    const value = e.target.value;
    this.setState({
      searchValue: value
    });

    PublicActions.setTitle(value ? `Searching for '${value}'`: 'Search');
    firebase.database.ref('users').once('value', (snap) => {
      let users = snap.val() || [];
      users = Object.keys(users).map((user) => {
        return users[user];
      });

      this.setState({
        users: users
      });
    });
  }

  userCard(user) {
    return (
      <UserCard currentUser={this.state.currentUser} key={user.id} user={user} />
    );
  }

  render() {
    return (
      <div>
        <TextField fullWidth name="search" onKeyDown={this.handleKeyDown} />
        <br/>
        <div>
        {
          this.state.users.map(this.userCard)
        }
        </div>
      </div>
    );
  }
}
