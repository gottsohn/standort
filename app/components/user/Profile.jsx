import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import SessionStore from '../../stores/SessionStore';
// import SessionActions from '../../actions/SessionActions';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.userStore = this.userStore.bind(this);
    this.getSession = this.getSession.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.state = {
      user: {},
      currentUser: {
        friends: {}
      },
      error: null
    };
  }

  componentDidMount() {
    SessionStore.listen(this.getSession);
    UserStore.listen(this.userStore, 'getUser');
    UserActions.get(this.props.params.id);
  }

  handleAddFriend() {
    let currentUser = this.state.currentUser;
    if (currentUser.friends[this.state.user.id]) {
      delete currentUser.friends[this.state.user.id];
    } else {
      currentUser.friends[this.state.user.id] = 1;
    }

    // UserActions.update(currentUser);
  }

  userStore(state) {
    this.setState({
      user: state.get.user,
      error: state.get.error
    });

    if (state.update.user) {
      console.log('update yo arse');
      // SessionActions.getSession(this.getSession);
    }
  }

  getSession(state) {
    console.log(state.session.friends);
    state.session.friends = state.session.friends || {};
    this.setState({
      currentUser: state.session
    });
  }

  render() {
    return (
      <div>
        {
          this.state.error ? <h2>this.state.error</h2> :
          <div>
            <Paper style={{padding: '20px'}}>
              <img src={this.state.user.photo} />
              <h2>{this.state.user.name}</h2>
              {this.state.currentUser.id !== this.state.user.id || true?
                <FlatButton label={this.state.currentUser.friends[this.state.user.id]? 'Remove Friend': 'Add Friend'}
                    onTouchTap={this.handleAddFriend}
                /> : null}
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
