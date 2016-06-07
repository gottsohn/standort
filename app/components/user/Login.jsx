import React from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from '../shared/Firebase';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.authHandler = this.authHandler.bind(this);
    this.state = {
      user: null
    };
  }

  authHandler(err, data) {
    console.log(err, data);
  }

  handleFacebookAuth() {
    console.log(this.authHandler, 'fn');
    firebase.authWithOAuthPopup('facebook', (err, data)=> {
      console.log(err, data);
    });
  }

  handleGoogleAuth() {
    firebase.authWithOAuthPopup('google', this.authHandler);
  }

  handleGitHubAuth() {
    firebase.authWithOAuthPopup('github', this.authHandler);
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
