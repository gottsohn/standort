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
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import firebase from '../../database';
import SessionStore from '../../stores/SessionStore';
import SessionActions from '../../actions/SessionActions';
import DrawerStore from '../../stores/DrawerStore';
import DrawerActions from '../../actions/DrawerActions';
import UserMenu from './UserMenu.jsx';

export default class LeftDrawer extends React.Component {
    constructor(props) {
      super(props);
      this.getSession = this.getSession.bind(this);
      this.handleUpdateInput = this.handleUpdateInput.bind(this);
      this.handleRequestChange = this.handleRequestChange.bind(this);
      this.drawerStateChanged = this.drawerStateChanged.bind(this);
      this.handleSideNavigation = this.handleSideNavigation.bind(this);
      this.state = {
        user: null,
        open: false,
        friends: [],
        width: 280
      };
    }

    componentDidMount() {
      SessionStore.listen(this.getSession);
      DrawerStore.listen(this.drawerStateChanged);
    }

    drawerStateChanged(state) {
      this.handleRequestChange(state.isOpen);
    }

    getSession(state) {
      let friends = [],
        user = state.session;

      if (user) {
        if (user.friends) {
          friends = user.friends;
          friends = Object.keys(friends).map(key => friends[key]);
        }
      }

      this.setState({
        user,
        friends
      });
    }

    handleSideNavigation() {
      DrawerActions.open(false);
    }

    handleSignOut() {
      firebase.auth.signOut().then((err) => {
        if (!err) {
          SessionActions.getSession();
          // console.log('logout ok');
        } else {
          // console.log(err, 'logout error');
        }
      });
    }

    handleUpdateInput() {

    }

    handleRequestChange(open) {
      this.setState({
        open
      });
    }

    userMenu(user) {
      return (
        <UserMenu user={user} />
      );
    }

    render() {
      const handleCloseDrawer = () => {
        this.handleRequestChange(false);
      };

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

              title={<Link style={{color: '#fff'}} to="/">Standort</Link>}
          />
          <AutoComplete
              dataSource={this.state.friends}
              disableFocusRipple={false}
              floatingLabelText="Friend's name"
              hintText="Type your friend's name"
              onUpdateInput={this.handleUpdateInput}
              style={{padding: '0 0 0 20px'}}
          />
          <Menu autoWidth={false} onTouchTap={handleCloseDrawer} width={this.state.width}>
           {this.state.user ?
             <Link to={`/users/${this.state.user.id}`}><MenuItem primaryText="My Profile" /></Link> :
             <Link to="/login"><MenuItem onTouchTap={handleCloseDrawer} primaryText="Login" /></Link>}
             {
               this.state.user ?
               <MenuItem
                   disabled={!this.state.friends.length}
                   menuItems={this.state.friends.map(this.userMenu)}
                   primaryText="My Friends"
                   rightIcon={<ArrowDropRight />}
               /> : null
             }
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
