import React from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import classnames from 'classnames';
import Snackbar from 'material-ui/Snackbar';
import SessionStore from '../../stores/SessionStore';
import PublicActions from '../../actions/PublicActions';

import firebase from '../../database';
import styles from '../../App.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.authHandler = this.authHandler.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
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
    PublicActions.setTitle('Login');
  }

  componentWillUnmount() {
    SessionStore.unlisten(this.getCurrentUser);
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
      <FlatButton
          key={provider.key}
          onTouchTap={login}
      >
        <i
            className={classnames('fa', 'fa-2x', `fa-${provider.name.toLowerCase()}`)}
            style={{color: provider.color, verticalAlign: 'middle'}}
        >
        </i>

      </FlatButton>
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
      key: 'google',
      color: '#D50F25'
    }, {
      name: 'Facebook',
      key: 'facebook',
      color: '#3B5999'
    }, {
      name: 'GitHub',
      key: 'github',
      color: '#222'
    }];

    return (
      <div className={styles.loginContainer}>
        {
          this.state.user ?
          <div><h2>Welcome {this.state.user.name}</h2></div> :
          <div className={styles.container}>
            <h2>Login</h2>
            <Divider/>
            <p>Login with a provider below to get started</p>
            <div>
            {authProviders.map(this.renderAuth)}
            </div>
          </div>
        }

        <Snackbar
            autoHideDuration={2000}
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
