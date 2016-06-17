import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';

export default class UserMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={`/users/${this.props.user.id}`}>
        <MenuItem
            primaryText={this.props.user.name}
            rightIcon={<Avatar src={this.props.user.photo}/>}
        />
      </Link>
    );
  }
}

UserMenu.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    photo: React.PropTypes.string.isRequired
  })
};
