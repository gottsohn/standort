import React from 'react';
import {Link} from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';
import Avatar from 'material-ui/Avatar';

import styles from '../../App.css';
import firebase from '../../database';
import SessionStore from '../../stores/SessionStore';
import SessionActions from '../../actions/SessionActions';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    SessionStore.listen(this.getCurrentUser);
  }

  handleSignOut() {
    firebase.auth.signout(SessionActions.getSession);
  }

  getCurrentUser(state) {
    if (state.session) {
      this.setState({
        user: state.session
      });
    }
  }

  render() {
    return (
      <AppBar className={styles.header}
          iconElementLeft={
            <Link to="/"><IconButton><ActionHome /></IconButton></Link>
          }

          iconElementRight={
              <IconMenu
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  iconButtonElement={
                     this.state.user ? <Avatar src={this.state.user.photo} /> : <IconButton><MoreVertIcon /></IconButton>
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                {this.state.user ? <Link to={`/users/${this.state.user.id}`}><MenuItem primaryText="My Profile"/></Link>:null}
                <Link to="/"><MenuItem primaryText="Help" /></Link>
                {this.state.user ? <MenuItem onTouchTap={this.handleSignOut} primaryText="Sign out"/> : <Link to="/login"><MenuItem primaryText="Login" /></Link>}

              </IconMenu>
            }
          title={this.props.title}
      />);
  }
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};
