import React from 'react';
import {Link} from 'react-router';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import AutoComplete from 'material-ui/AutoComplete';

import firebase from '../../database';
import SessionStore from '../../stores/SessionStore';
import SessionActions from '../../actions/SessionActions';

export default class LeftDrawer extends React.Component {
    constructor(props) {
      super(props);
      this.getSession = this.getSession.bind(this);
      this.handleUpdateInput = this.handleUpdateInput.bind(this);
      this.handleRequestChange = this.handleRequestChange.bind(this);
      this.handleSideNavigation = this.handleSideNavigation.bind(this);
      this.state = {
        user: null,
        open: false,
        friends: [],
        width: 280
      };
    }

    componentWillMount() {
      this.setState({
        open: this.props.open
      });
    }

    componentDidMount() {
      SessionStore.listen(this.getSession);
    }

    componentWillReceiveProps() {
      this.setState({
        open: !this.state.open
      });
    }

    getSession(state) {
      this.setState({
        user: state.session
      });
    }

    handleSideNavigation() {
      this.setState({
        open: !this.state.open
      });
    }

    handleSignOut() {
      firebase.auth.signout(SessionActions.getSession);
    }

    handleUpdateInput() {

    }

    handleRequestChange(open) {
      this.setState({
        open
      });
    }

    render() {
      return (
        <Drawer
            docked={false}
            onRequestChange={this.handleRequestChange}
            open={this.state.open}
            width={this.state.width}
        >
          <AppBar
              iconElementLeft = {
                <IconButton onTouchTap={this.handleSideNavigation}><NavigationClose /></IconButton>
              }

              title={this.props.title}
          />
          <AutoComplete
              dataSource={this.state.friends}
              disableFocusRipple={false}
              floatingLabelText="Friend's name"
              hintText="Type your friend's name"
              onUpdateInput={this.handleUpdateInput}
              style={{padding: '0 0 0 20px'}}
          />
          <Menu autoWidth={false} width={this.state.width}>
           {this.state.user ?
             <Link to={`/users/${this.state.user.id}`}><MenuItem primaryText="My Profile" /></Link> :
             <Link to="/login"><MenuItem primaryText="Login" /></Link>}
           {this.state.user ?
             <Link to="/search"><MenuItem primaryText="Find People" /></Link> :
             null}
           <Link to="/help"><MenuItem primaryText="Help" /></Link>
           {this.state.user ? <Divider /> : null}
           {this.state.user ? <MenuItem onTouchTap={this.handleSignOut} primaryText="Sign out" /> : null}
         </Menu>
        </Drawer>
      );
    }
}

LeftDrawer.propTypes = {
  open: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired
};
