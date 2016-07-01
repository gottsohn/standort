import React from 'react';
import Paper from 'material-ui/Paper';
import classnames from 'classnames';
import {Link} from 'react-router';

import styles from '../../App.css';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import SessionStore from '../../stores/SessionStore';
import SessionActions from '../../actions/SessionActions';
import PublicActions from '../../actions/PublicActions';
import FriendRequestButton from '../shared/FriendRequestButton.jsx';
import Map from '../shared/Map.jsx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.userStore = this.userStore.bind(this);
    this.getSession = this.getSession.bind(this);
    this.state = {
      user: null,
      users: [null, props.params.id],
      currentUser: {
        friends: {},
        sentRequests: {}
      }
    };
  }

  componentDidMount() {
    SessionStore.listen(this.getSession);
    UserStore.listen(this.userStore);
    UserActions.get(this.props.params.id);
    SessionActions.getSession();
    PublicActions.setTitle('Profile');
  }

  componentWillUnmount() {
    SessionStore.unlisten(this.getSession);
    UserStore.unlisten(this.userStore);
  }

  userStore(state) {
    let users = this.state.users;
    if (state.get.user) {
      users[1] = state.get.user.id;
      setTimeout(() => {
        PublicActions.setTitle(state.get.user ? state.get.user.name: null);
        return true;
      }, 100);
    }

    this.setState({
      user: state.get.user,
      error: state.get.error,
      users
    });
  }

  getSession(state) {
    let users = this.state.users;
    if (state.session) {
      state.session.friends = state.session.friends || {};
      state.session.sentRequests = state.session.sentRequests || {};
      users[0] = state.session.id;
    }

    this.setState({
      currentUser: state.session,
      users
    });
  }

  render() {
    const currentUser = this.state.currentUser;
    const user = this.state.user;
    return (
      <div>
        {
          !user  ?
          <div>
            <h2>{this.state.error || 'User not found'}</h2>
            <p>Error parsing user data</p>
          </div> :
          <div>
            <Paper style={{padding: '20px'}}>
              <div className={styles.inlineBlock}>
                <img
                    className={styles.imageCard}
                    src={user.photo}
                />
              </div>
              <div className={styles.inlineBlock}>
                <h2>{user.name}</h2>
                <small>
                  {
                    user.email ?
                    user.email.replace(/[a-z].*@/g, '*******@'): null
                  }
                </small>
                <FriendRequestButton
                    currentUser={this.state.currentUser}
                    user={user}
                />
              </div>
            </Paper>
            <br/>
            <Paper>
              {
                (currentUser &&
                currentUser.friends &&
                currentUser.friends[user.id]) ||
                currentUser && user.id === currentUser.id ?
                  <Map
                      currentUser={currentUser}
                      users={this.state.users}
                  />
                : <div className={classnames(styles.container, styles.center)}>
                    <i className={classnames('fa', 'fa-5x', 'fa-warning')}></i>
                    <p className={styles.largeText}>
                      You need to be friends with
                        <Link to={`/users/${user.id}`}>
                          <b> {user.name} </b>
                        </Link>
                      to see his/her location.</p>
                  </div>
              }

            </Paper>
          </div>
        }
      </div>
    );
  }
}

Profile.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired
  })
};
