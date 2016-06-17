import React from 'react';
import {Link} from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationHome from 'material-ui/svg-icons/navigation/menu';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import styles from '../../App.css';
import firebase from '../../database';
import SessionStore from '../../stores/SessionStore';
import PublicStore from '../../stores/PublicStore';
import SessionActions from '../../actions/SessionActions';
import LeftDrawer from './LeftDrawer.jsx';
import DrawerActions from '../../actions/DrawerActions';
import UserMenu from './UserMenu.jsx';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.handleSideNavigation = this.handleSideNavigation.bind(this);
    this.state = {
      user: null,
      title: 'Standort',
      requests: [],
      friends: [],
      isDrawerOpen: false
    };
  }

  componentDidMount() {
    SessionStore.listen(this.getCurrentUser);
    PublicStore.listen(this.setTitle);
  }

  componentWillUnmount() {
    SessionStore.unlisten(this.getCurrentUser);
    PublicStore.unlisten(this.setTitle);
  }

  handleSignOut() {
    firebase.auth.signOut().then((err) => {
      if (!err) {
        SessionActions.getSession();
      }
    });
  }

  getCurrentUser(state) {
    let requests = [],
      friends = [],
      user = state.session;

    if (user) {
      if (user.receivedRequests) {
        requests = user.receivedRequests;
        requests = Object.keys(requests).map(key => requests[key]);
      }

      if (user.friends) {
        friends = user.friends;
        friends = Object.keys(friends).map(key => friends[key]);
      }
    }

    this.setState({
      user,
      requests,
      friends
    });
  }

  handleSideNavigation() {
    DrawerActions.open(true);
  }

  setTitle(state) {
    this.setState({
      title: state.title
    });
  }

  userMenu(user) {
    return (
      <UserMenu user={user} />
    );
  }

  render() {
    return (
      <div>
      <LeftDrawer />
      <AppBar className={styles.header}
          iconElementLeft = {
            <IconButton onTouchTap={this.handleSideNavigation}>
              <NavigationHome />
            </IconButton>
          }

          iconElementRight = {
              <IconMenu
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  iconButtonElement={
                     this.state.user ? <Avatar src={this.state.user.photo} /> :
                        <IconButton><MoreVertIcon /></IconButton>
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                {
                  this.state.user ?
                  <Link to={`/users/${this.state.user.id}`}>
                    <MenuItem primaryText="My Profile"/>
                  </Link> : null
                }
                {
                  this.state.user ?
                  <MenuItem
                      disabled={!this.state.friends.length}
                      menuItems={this.state.friends.map(this.userMenu)}
                      primaryText="My Friends"
                      rightIcon={<ArrowDropRight />}
                  /> : null
                }
                {
                  this.state.user ?
                  <MenuItem
                      disabled={!this.state.requests.length}
                      menuItems={this.state.requests.map(this.userMenu)}
                      primaryText="Received Requests"
                      rightIcon={<ArrowDropRight />}
                  /> : null
               }
                <Link to="/"><MenuItem primaryText="Help" /></Link>
                <Divider />
                {
                  this.state.user ?
                  <MenuItem
                      onTouchTap={this.handleSignOut}
                      primaryText="Sign out"
                  /> :
                  <Link to="/login">
                    <MenuItem primaryText="Login" />
                  </Link>
                }

              </IconMenu>
            }
          title={this.state.title}
      />
      </div>);
  }
}
