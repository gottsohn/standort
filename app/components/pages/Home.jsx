import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

import PublicActions from '../../actions/PublicActions';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';
import styles from '../../App.css';
import Map from '../shared/Map.jsx';
// import UserStore from '../../stores/UserStore_';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.getSession = this.getSession.bind(this);
    this.state = {
      currentUser: null,
      users: null
    };
  }

  componentDidMount() {
    SessionStore.listen(this.getSession);
    PublicActions.setTitle('Home');
    SessionActions.getSession();
    // UserStore.getState().then(this.getUser);
  }

  getSession({session}) {
    const currentUser = session;
    if (currentUser) {
      const users = Object.keys(currentUser.friends || {});
      users.unshift(currentUser.id);
      this.setState({
        currentUser,
        users
      });
    }
  }

  getUser() {
    // console.log(state);
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Find more friends <Link to="/search">here</Link>.</p>
        {
          this.state.users
           ?
            <Map
                currentUser={this.state.currentUser}
                users={this.state.users}
            />
          : <div className={classnames(styles.container, styles.center)}>
              <i className={classnames('fa', 'fa-5x', 'fa-warning')}></i>
              <p className={styles.largeText}>
                You need to login to view the Map
              </p>
            </div>
        }
      </div>
    );
  }
}
