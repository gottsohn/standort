import React from 'react';
import Header from './components/shared/Header.jsx';
import styles from './App.css';
import firebase from './database';
import SessionStore from './stores/SessionStore';
import SessionActions from './actions/SessionActions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.authCallback = this.authCallback.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.state = {
      user: {
        id: null
      }
    };
  }

  getChildContext() {
      return {
        user: this.state.user
      };
  }

  componentDidMount() {
    this.authCallback();
  }

  authCallback() {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        // A user is logged in
        SessionStore.listen(this.getCurrentUser);
        SessionActions.getSession();
      } else {
        // User is not logged or user is logged out
        // Remove user from state
        this.setState({
          user: {
            id: null
          }
        });
      }
    });
  }

  getCurrentUser(state) {
    if (state.session && state.session.id) {
      const userRef = firebase.database.ref(`users/${state.session.id}`);
      // Save the user in the state
      this.setState({
        user: state.session
      });

      userRef.once('value', (snap) => {
        if(!snap.val()) {
          // Save user if user doesn't exist
          state.session.createdAt = Date.now();
          userRef.set(state.session);
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

  App.propTypes = {
    children: React.PropTypes.element.isRequired
  };

  App.childContextTypes = {
    user: React.PropTypes.shape({
      name: React.PropTypes.string,
      id: React.PropTypes.string,
      uid: React.PropTypes.string,
      photo: React.PropTypes.string,
      email: React.PropTypes.string
    })
  };
