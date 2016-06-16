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

import styles from '../../App.css';
import firebase from '../../database';
import SessionStore from '../../stores/SessionStore';
import SessionActions from '../../actions/SessionActions';
import LeftDrawer from './LeftDrawer.jsx';
import DrawerActions from '../../actions/DrawerActions';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.handleSideNavigation = this.handleSideNavigation.bind(this);
    this.state = {
      user: null,
      isDrawerOpen: false
    };
  }

  componentDidMount() {
    SessionStore.listen(this.getCurrentUser);
  }

  handleSignOut() {
    firebase.auth.signOut().then(SessionActions.getSession);
  }

  getCurrentUser(state) {
    this.setState({
      user: state.session
    });
  }

  handleSideNavigation() {
    DrawerActions.open(true);
  }

  render() {
    return (
      <div>
      <LeftDrawer title={this.props.title} />
      <AppBar className={styles.header}
          iconElementLeft = {
            <IconButton onTouchTap={this.handleSideNavigation}><NavigationHome /></IconButton>
          }

          iconElementRight = {
              <IconMenu
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  iconButtonElement={
                     this.state.user ? <Avatar src={this.state.user.photo} /> : <IconButton><MoreVertIcon /></IconButton>
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                {this.state.user ? <Link to={`/users/${this.state.user.id}`}><MenuItem primaryText="My Profile"/></Link> : null}
                <Link to="/"><MenuItem primaryText="Help" /></Link>
                <Divider />
                {this.state.user ? <MenuItem onTouchTap={this.handleSignOut} primaryText="Sign out"/> : <Link to="/login"><MenuItem primaryText="Login" /></Link>}

              </IconMenu>
            }
          title={this.props.title}
      />
      </div>);
  }
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};
