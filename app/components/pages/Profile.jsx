import React from 'react';
import Paper from 'material-ui/Paper';
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

  userStore(state) {
    this.setState({
      user: state.get.user,
      error: state.get.error
    });

    // if (state.get.user) {
    //   PublicActions.setTitle(state.get.user.name);
    // }
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
          this.state.error ? <h2>{this.state.error}</h2> :
          <div>
            <Paper style={{padding: '20px'}}>
              <img src={this.state.user.photo} />
              <h2>{this.state.user.name}</h2>
              <FriendRequestButton currentUser={this.state.currentUser} user={this.state.user} />
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
