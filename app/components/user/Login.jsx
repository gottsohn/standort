import React from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from '../../database';
import Snackbar from 'material-ui/Snackbar';
import SessionStore from '../../stores/SessionStore';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.authHandler = this.authHandler.bind(this);
    this.renderAuth = this.renderAuth.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.state = {
      user: null,
      snackbar: {
        open: false,
        message: ''
      }
    };
  }

  componentDidMount() {
    SessionStore.listen(this.getCurrentUser);
  }

  getCurrentUser(state) {
    this.setState({
      user: state.session
    });
  }

  authHandler(err) {
    if (err) {
      this.setState({
        snackbar: {
          open: true,
          message: 'Error with authentication'
        }
      });
    }
  }

  handleAuth(provider) {
    firebase.auth.signInWithPopup(provider).then((result) => {
      this.authHandler(null, result);
    }).catch((error) => {
      this.authHandler(error);
    });
  }

  renderAuth(provider) {
    let login = (provider) => {
      this.handleAuth(provider);
    };

    login = login.bind(this, firebase.providers[provider.key]);
    return (
      <RaisedButton key={provider.key} label={provider.name}  onTouchTap={login}/>
    );
  }

  handleRequestClose() {
    this.setState({
      snackbar: {
        open: false,
        message: ''
      }
    });
  }

  render() {
    const authProviders = [{
      name: 'Google',
      key: 'google'
    }, {
      name: 'Facebook',
      key: 'facebook'
    }, {
      name: 'GitHub',
      key: 'github'
    }];

    return (
      <div>
        {
          this.state.user ?
          <div><h2>Welcome {this.state.user.name}</h2></div> :
          <div>
            <h2>Login</h2>
            <Divider/>
            <p>Login with a social media account provided below</p>
            <div>
            {authProviders.map(this.renderAuth)}
            </div>
          </div>
        }
        <Snackbar
            autoHideDuration={4000}
            message={this.state.snackbar.message}
            onRequestClose={this.handleRequestClose}
            open={this.state.snackbar.open}
        />
      </div>
    );
  }
}


Login.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  })
};
