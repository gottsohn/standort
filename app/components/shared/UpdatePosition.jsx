import React from 'react';
import Snackbar from 'material-ui/Snackbar';

import UserActions from '../../actions/UserActions';
const navigator = window.navigator;

export default class UpdatePosition extends React.Component {
  constructor(props) {
    super(props);
    this.onLocation = this.onLocation.bind(this);
    this.watchId = null;
    this.options = {
      timeout: 60000,
      enableHighAccuracy: true
    };
    this.currentUser = null;
    this.state = {
      snackbar: {
        message: '',
        open: false
      },

      currentUser: null
    };

    this.onLocationError =
      this.onLocationError.bind(this);

    this.handleRequestClose =
      this.handleRequestClose.bind(this);

    this.setLocationListener =
      this.setLocationListener.bind(this);
  }

  componentWillMount() {
    if (navigator.geolocation) {
      this.setLocationListener();
    } else {
      this.setState({
        snackbar: {
          open: true,
          message: 'Your browser doens\'t support Location services'
        }
      });
    }
  }

  componentWillReceiveProps({currentUser}) {
    if (navigator.geolocation && !this.currentUser) {
      this.getUserLocation();
      this.currentUser = currentUser;
    }
  }

  componentWillUnmount() {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  setLocationListener() {
    this.watchId = navigator.geolocation.watchPosition(
      this.onLocation,
      this.onLocationError,
      this.options);
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(this.onLocation,
      this.onLocationError,
      this.options);
  }

  onLocationError(error) {
    const message = `ERROR:${error.code} - ${error.message}`;
    this.setState({
      snackbar: {
        open: true,
        message: message
      }
    });
  }

  onLocation(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    if (this.props.currentUser) {
      // console.log(this.props.currentUser.id);
      UserActions.update({
        id: this.props.currentUser.id,
        position: {
          lat,
          lng
        }
      });

      this.setState({
        snackbar: {
          open: true,
          message: 'Location updated.'
        }
      });
    }
  }

  handleRequestClose() {
    this.setState({
      snackbar: {
        open: false,
        message: ''
      }
    });
  }

  render() {
    return (
      <Snackbar
          autoHideDuration={1000}
          message={this.state.snackbar.message}
          onRequestClose={this.handleRequestClose}
          open={this.state.snackbar.open}
      />
    );
  }
}

UpdatePosition.propTypes = {
  currentUser: React.PropTypes.shape({
    id: React.PropTypes.string
  })
};
