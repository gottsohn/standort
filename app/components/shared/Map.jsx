import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {GoogleMapLoader, Marker, GoogleMap} from
  'react-google-maps';

import firebase from '../../database';
import markerIcon from 'file!../../images/pin.png';
import markerMe from 'file!../../images/pin2.png';

const navigator = window.navigator;
export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.watchId = null;
    this.onLocation = this.onLocation.bind(this);
    this.options = {
      timeout: 120000,
      enableHighAccuracy: true
    };

    this.onLocationError = this.onLocationError.bind(this);
    this.positionListener = this.positionListener.bind(this);
    this.drawMarker = this.drawMarker.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      markers: new Array(props.users.length),
      position: {
        lat: 6.55555,
        lng: 3.44444
      },

      snackbar: {
        message: '',
        open: false
      },

      zoom: 13
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.onLocation,
        this.onLocationError,
        this.options);

      this.watchId = navigator.geolocation.watchPosition(
        this.onLocation,
        this.onLocationError,
        this.options);
    }
  }

  componentWillReceiveProps({users}) {
    users.forEach((userId, index) => {
      if (userId && !this.state.markers[index]) {
        const userRef = firebase.database.ref(`users/${userId}`);
        userRef.off('value');
        if(index === 0) {
          userRef.once('value', (snap) => this.positionListener(index, snap));
        } else {
          userRef.on('value', (snap) => this.positionListener(index, snap));
        }
      }
    });
  }

  componentWillUnmount() {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(this.watchId);
    }

    this.state.markers.forEach((marker) => {
      if (marker && marker.user && marker.user.id) {
        firebase.database.ref(`users/${marker.user.id}`).off('value');
      }
    });
  }

  positionListener(index, snap) {
    const user = snap.val();
    if(user) {
      let markers = this.state.markers;
      markers[index] = {
        me: index === 0,
        position: user.position,
        user: {
          name: user.name
        }
      };

      this.setState({
        markers: markers
      });
    }
  }

  drawMarker(marker, index) {
    if (marker.position) {
      return (
        <Marker
            icon={marker.me ? markerMe: markerIcon}
            key={index}
            position={marker.position}
            title={marker.user.name}
        />);
    }

    return null;
  }

  onLocationError(error) {
    const message = `Error getting location [${error.message} - Code:${error.code}]`;
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
    let markers = this.state.markers;
    markers[0] = markers[0] || {
      user: {}
    };
    markers[0].user.name = markers[0].user.name || 'Anonymous';
    markers[0].me = true;
    markers[0].position = {
      lat,
      lng
    };

    this.setState({
      position: {
        lat,
        lng
      },

      markers
    });
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
      <div>
        <GoogleMapLoader
            containerElement = {
              <div style={{height: '500px'}}>
              </div>
            }

            googleMapElement= {
              <GoogleMap
                  center={this.state.position}
                  defaultCenter={this.state.position}
                  zoom={this.state.zoom}
              >
                {
                  this.state.markers.map(this.drawMarker)
                }
              </GoogleMap>
            }
        />
        <Snackbar
            autoHideDuration={4000}
            message={this.state.snackbar.message}
            onRequestClose={this.handleRequestClose}
            open={this.state.snackbar.open}
        />
      </div>
    );
  }
}

Map.propTypes = {
  currentUser: React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string
  }),
  height: React.PropTypes.string,
  users: React.PropTypes.arrayOf(React.PropTypes.string)
};
