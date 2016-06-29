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
    this.onLocation = this.onLocation.bind(this);
    this.onLocationError =
      this.onLocationError.bind(this);

    this.drawMarker = this.drawMarker.bind(this);
    this.handleRequestClose =
      this.handleRequestClose.bind(this);

    this.watchId = null;
    this.state = {
      markers: new Array(props.users.length),
      position: {
        lat: 3.33,
        lng: 6.66
      },

      snackbar: {
        message: '',
        open: false
      },

      zoom: 13
    };
  }

  componentWillMount() {
    // if (navigator.geolocation) {
    //   this.watchId = navigator.geolocation.watchPosition(
    //     this.onLocation,
    //     this.onLocationError,
    //     {
    //       timeout: 30000
    //   });
    // } else {
    //   this.setState({
    //     snackbar: {
    //       open: true,
    //       message: 'Your browser doens\'t support Location services'
    //     }
    //   });
    // }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        this.onLocation,
        this.onLocationError,
        {
          timeout: 30000
      });
    }
  }

  componentWillReceiveProps(newProps) {
    newProps.users.forEach((userId, index) => {
      if (userId && !this.state.markers[index] && index > 0) {
        const userRef = firebase.database.ref(`users/${userId}`);
        userRef.off('value');
        userRef.on('value', (snap) => {
          const user = snap.val();
          if(user) {
            let markers = this.state.markers;
            markers[index] = {
              position: user.position,
              user: {
                name: user.name
              }
            };

            this.setState({
              markers: markers
            });
          }
        });
      }
    });
  }

  componentWillUnmount() {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(this.watchId);
    }

    this.state.markers.forEach((marker) => {
      if (marker && marker.user && marker.user.id) {
        firebase.database.ref(`users/${ marker.user.id}`).off('value');
      }
    });
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
    let markers = this.state.markers;
    const currentUser = this.props.currentUser || {
      name: 'Anon'
    };

    markers[0] = {
      user: {
        name: currentUser.name
      },
      me: true,
      position: {
        lat,
        lng
      }
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
              <div style={{height: '400px'}}>
              </div>
            }

            googleMapElement= {
              <GoogleMap
                  center={this.state.position}
                  zoom={this.state.zoom}
              >
                {
                  this.state.markers.map(this.drawMarker)
                }
              </GoogleMap>
            }
        />
        <Snackbar
            autoHideDuration={2000}
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

  users: React.PropTypes.arrayOf(React.PropTypes.string)
};
