import React from 'react';
import Paper from 'material-ui/Paper';

import styles from '../../App.css';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import SessionStore from '../../stores/SessionStore';
import SessionActions from '../../actions/SessionActions';
import PublicActions from '../../actions/PublicActions';
import FriendRequestButton from '../shared/FriendRequestButton.jsx';


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.userStore = this.userStore.bind(this);
    this.getSession = this.getSession.bind(this);
    this.state = {
      user: {},
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
    this.setState({
      user: state.get.user,
      error: state.get.error
    });

    if (state.get.user) {
      setTimeout(() => {
        PublicActions.setTitle(state.get.user.name);
        return true;
      }, 100);
    }
  }

  getSession(state) {
    if (state.session) {
      state.session.friends = state.session.friends || {};
      state.session.sentRequests = state.session.sentRequests || {};
    }

    this.setState({
      currentUser: state.session
    });
  }

  render() {
    return (
      <div>
        {
          !this.state.user ? <h2>{this.state.error}</h2> :
          <div>
            <Paper style={{padding: '20px'}}>
              <div className={styles.inlineBlock}>
                <img src={this.state.user.photo} />
              </div>
              <div className={styles.inlineBlock}>
                <h2>{this.state.user.name}</h2>
                <small>
                  {
                    this.state.user.email ?
                    this.state.user.email.replace(/[a-z].*@/g, '****@'): null
                  }
                </small>
                <FriendRequestButton
                    currentUser={this.state.currentUser}
                    user={this.state.user}
                />
              </div>
            </Paper>
            <br/>
            <Paper style={{padding: '20px'}}>
            <h1>Google Map Goes Here</h1>
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
