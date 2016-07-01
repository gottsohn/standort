import React from 'react';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';

import FriendRequestButton from './FriendRequestButton.jsx';
import styles from '../../App.css';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser
    };
  }

  componentWillReceiveProps({currentUser}) {
    this.setState({
      currentUser
    });
  }

  render() {

    return (
      <Paper
          className={styles.userCard}
          zDepth={1}
      >
        <Link to={`/users/${this.props.user.id}`}>
          <div>
            <p>
              <img
                  className={styles.imageCard}
                  src={
                    this.props.user.photo ||
                    'https://upload.wikimedia.org/wikipedia/commons/7/7c'+
                    '/Profile_avatar_placeholder_large.png'
                  }
              />
            </p>
            <h5>{this.props.user.name}</h5>
          </div>
        </Link>
        <div className={styles.buttonContainer}>
          <FriendRequestButton
              currentUser={this.state.currentUser}
              user={this.props.user}
          />
        </div>
      </Paper>
    );
  }
}

const userProp = {
  photo: React.PropTypes.string,
  name: React.PropTypes.string,
  id: React.PropTypes.string
};

UserCard.propTypes = {
  currentUser: React.PropTypes.shape(userProp),
  user: React.PropTypes.shape(userProp)
};
