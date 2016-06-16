import React from 'react';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import styles from '../../App.css';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={`/users/${this.props.user.id}`}>
        <Paper
            className={styles.userCard}
            key={this.props.user.id}
            zDepth={1}
        >
          <p>
            <img className={styles.imageCard} src={this.props.user.photo}/>
          </p>
          <h5>{this.props.user.name}</h5>
        </Paper>
      </Link>
    );
  }
}

UserCard.propTypes = {
  user: React.PropTypes.shape({
    photo: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired
  })
};
