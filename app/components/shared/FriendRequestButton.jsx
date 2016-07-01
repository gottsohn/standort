import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import UserActions from '../../actions/UserActions';

export default class FriendRequestButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    const user = this.processUser(props.user);
    const currentUser = this.processUser(props.currentUser);
    this.state = {
      user,
      currentUser
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentUser && !this.state.currentUser.id &&
        newProps.currentUser.id) {

      const currentUser = this.processUser(newProps.currentUser);
      this.setState({
        currentUser
      });
    }

    if(!this.state.user.id && newProps.user.id) {
      const user = this.processUser(newProps.user);
      this.setState({
        user
      });
    }
  }

  processUser(user) {
    user = user || {};
    user.friends = user.friends || {};
    user.receivedRequests = user.receivedRequests || {};
    user.sentRequests = user.sentRequests || {};
    return user;
  }

  handleAddFriend() {
    let currentUser = this.state.currentUser,
      user = this.state.user,
      updatedUser = {
        id: user.id
      },
      updatedCurrentUser = {
        id: currentUser.id
      },
      friend = {
        id: user.id,
        name: user.name,
        photo: user.photo,
        createdAt: Date.now()
      },
      me = {
        id: currentUser.id,
        name: currentUser.name,
        photo: currentUser.photo,
        createdAt: Date.now()
      };

    if (currentUser.friends[user.id]) {
      // Remove friend
      delete user.friends[currentUser.id];
      delete currentUser.friends[user.id];
      updatedUser.friends = user.friends;
      updatedCurrentUser.friends = currentUser.friends;
    } else if (currentUser.sentRequests[user.id]) {
      // Cancel friend request
      delete user.receivedRequests[user.id];
      delete currentUser.sentRequests[user.id];
      updatedUser.receivedRequests = user.receivedRequests;
      updatedCurrentUser.sentRequests = currentUser.sentRequests;
    } else if (currentUser.receivedRequests[user.id]) {
      // Accepts friend request
      currentUser.friends[user.id] = friend;
      user.friends[currentUser.id] = me;

      // Remove friend request data
      delete currentUser.receivedRequests[user.id];
      delete user.sentRequests[currentUser.id];

      // Set objects to be updated
      updatedUser.sentRequests = user.sentRequests;
      updatedUser.friends = user.friends;
      updatedCurrentUser.receivedRequests = currentUser.receivedRequests;
      updatedCurrentUser.friends = currentUser.friends;
    } else {
      // Send Friend request
      currentUser.sentRequests[user.id] = friend;
      user.receivedRequests[currentUser.id] = me;
      updatedUser.receivedRequests = user.receivedRequests;
      updatedCurrentUser.sentRequests = currentUser.sentRequests;
    }

    UserActions.update(updatedUser);
    UserActions.update(updatedCurrentUser);
    this.setState({
      currentUser,
      user
    });
  }

  render() {
    let label = 'Add Friend',
      showButton = true,
      disabled = false,
      currentUser = this.state.currentUser,
      user = this.state.user;

    if (currentUser && currentUser.id) {
      if (currentUser.id === user.id) {
        label = 'Me';
        disabled = true;
      } else if (currentUser.friends[user.id]) {
        label = 'Unfriend';
      } else if (currentUser.sentRequests[user.id]) {

        label = 'Cancel Request';
      } else if (currentUser.receivedRequests[user.id]) {

        label = 'Accept Request';
      }
    } else {
      disabled = true;
    }

    return (
      <div>
      {
        showButton ?
        <FlatButton
            disabled={disabled}
            label={label}
            onTouchTap={this.handleAddFriend}
        /> :
        null
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
