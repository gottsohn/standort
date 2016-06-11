import React from 'react';
import styles from '../../App.css';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/home';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
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
                       <IconButton><MoreVertIcon /></IconButton>
                      }
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <Link to="/login"><MenuItem primaryText="Login" /></Link>
                    <Link to="/"><MenuItem primaryText="Help" /></Link>
                  </IconMenu>
            }
          title={this.props.title}
      />);
  }
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};
