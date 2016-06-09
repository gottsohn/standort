import React from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {auth, providers} from '../../databse';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.authHandler = this.authHandler.bind(this);
    this.handleFacebookAuth = this.handleFacebookAuth.bind(this);
    this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
    this.handleGitHubAuth = this.handleGitHubAuth.bind(this);
    this.state = {
      user: null
    };
  }

  authHandler(err, data) {
    console.log(err, data);
  }

  handleFacebookAuth() {
    auth.signInWithPopup(providers.facebook).then((result) => {
      this.authHandler(null, result);
    }).catch((error) => {
      this.authHandler(error);
    });
  }

  handleGoogleAuth() {
    auth.signInWithPopup(providers.google).then((result) => {
      this.authHandler(null, result);
    }).catch((error) => {
      this.authHandler(error);
    });
  }

  handleGitHubAuth() {
    auth.signInWithPopup(providers.github).then((result) => {
      this.authHandler(null, result);
    }).catch((error) => {
      this.authHandler(error);
    });
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <Divider/>
        <p>Login with a social media account provided below</p>
        <div>
          <RaisedButton label="Google"  onTouchTap={this.handleGoogleAuth} />
          <RaisedButton label="Facebook" onTouchTap={this.handleFacebookAuth} />
          <RaisedButton label="Github"  onTouchTap={this.handleGitHubAuth} />
        </div>
      </div>
    );
  }
}
