import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import UserActions from '../../actions/UserActions';

export default class FriendRequestButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.state = {
      user: {},
      currentUser: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.currentUser.id && newProps.currentUser &&
        newProps.currentUser.id) {

      let currentUser = newProps.currentUser;
      currentUser.friends = currentUser.friends || {};
      currentUser.receivedRequests = currentUser.receivedRequests || {};
      currentUser.sentRequests = newProps.currentUser.sentRequests || {};
      this.setState({
        currentUser
      });
    }

    if(!this.state.user.id && newProps.user.id) {
      let user = newProps.user;
      user.friends = user.friends || {};
      user.receivedRequests = user.receivedRequests || {};
      user.sentRequests = user.sentRequests || {};
      this.setState({
        user
      });
    }
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
  }

  render() {
    let label = 'Add Friend',
      currentUser = this.state.currentUser,
      user = this.state.user;

    if (currentUser && currentUser.id) {
      if (currentUser.id === user.id) {
        label = null;
      } else if (currentUser.friends[user.id]) {
        label = 'Unfriend';
      } else if (currentUser.sentRequests[user.id]) {
        label = 'Cancel Request';
      } else if (currentUser.receivedRequests[user.id]) {
        label = 'Accept Request';
      }
    } else {
      label = null;
    }

    return (
      <div>
      {label ?
        <FlatButton label={label}
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
