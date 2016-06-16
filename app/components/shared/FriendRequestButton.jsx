import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import SessionStore from '../../stores/SessionStore';

export default class FriendRequestButton extends React.Component {
  constructor(props) {
    super(props);
    this.userStore = this.userStore.bind(this);
    this.getSession = this.getSession.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.state = {
      user: {},
      currentUser: {
        friends: {},
        sentRequests: {},
        receivedRequests: {}
      }
    };
  }

  componentWillMount() {
    this.setState({
      user: this.props.user,
      currentUser: this.props.currentUser
    });
  }

  componentDidMount() {
    SessionStore.listen(this.getSession);
    UserStore.listen(this.userStore);
  }

  handleAddFriend() {
    let currentUser = this.state.currentUser,
      friend = {
        name: this.state.user.name,
        photo: this.state.user.photo,
        createdAt: Date.now()
      },

      me = {
        name: this.state.currentUser.name,
        photo: this.state.currentUser.photo,
        createdAt: Date.now()
      };

    if (this.state.currentUser.friends[this.state.user.id]) {
      delete currentUser.friends[this.state.user.id];
      UserActions.set(this.state.user,
        `friends/${this.state.currentUser.id}`, null);
    } else if (this.state.currentUser.sentRequests[this.state.user.id]) {
      delete currentUser.sentRequests[this.state.user.id];
      UserActions.set(this.state.user,
        `receivedRequests/${this.state.currentUser.id}`, null);
    } else if (this.state.currentUser.receivedRequests[this.state.user.id]) {
      currentUser.friends[this.state.user.id] = friend;
      UserActions.set(this.state.user,
        `friends/${this.state.currentUser.id}`, me);
    } else {
      currentUser.sentRequests[this.state.user.id] = friend;
      UserActions.set(this.state.user,
        `receivedRequests/${this.state.currentUser.id}`, me);
    }

    UserActions.update(currentUser);
  }

  userStore(state) {
    this.setState({
      user: state.get.user,
      error: state.get.error
    });
  }

  getSession(state) {
    if (state.session) {
      state.session.friends = state.session.friends || {};
      state.session.sentRequests = state.session.sentRequests || {};
      state.session.receivedRequests = state.session.receivedRequests || {};
    }

    this.setState({
      currentUser: state.session
    });
  }

  render() {
    let label = 'Add Friend';
    if (this.state.currentUser && this.state.currentUser.id) {
      if (this.state.currentUser.id === this.state.user.id) {
        label = null;
      } else if (this.state.currentUser.friends[this.state.user.id]) {
        label = 'Unfriend';
      } else if (this.state.currentUser.sentRequests[this.state.user.id]) {
        label = 'Cancel friend Request';
      } else if (this.state.currentUser.receivedRequests[this.state.user.id]) {
        label = 'Accept friend Request';
      }
    } else {
      label = null;
    }

    return (
      <div>
      {label ?
        <RaisedButton label={label}
            onTouchTap={this.handleAddFriend}
        /> :
         label
       }
      </div>
    );
  }
}

const userPropShape = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  photo: React.PropTypes.string
};

FriendRequestButton.propTypes = {
  currentUser: React.PropTypes.shape(userPropShape),
  user: React.PropTypes.shape(userPropShape)
};
