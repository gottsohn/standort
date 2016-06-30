import React from 'react';
import PublicActions from '../../actions/PublicActions';
import UserStore from '../../stores/UserStore_';

export default class Help extends React.Component {
  constructor(props) {
    super(props);
    // this.getUser = this.getUser.bind(this);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    PublicActions.setTitle('Help');
    UserStore.dispatch({
      type: 'GET',
      userId: 'google:115413168013759099623'
    });

    //UserStore.getState().then(this.getUser, this.getUser);
  }

  // getUser(state) {
  //   this.setState({
  //     currentUser: state.user || {}
  //   });
  // }

  render() {
    return (
      <div>
        <h1>Hilfe</h1>
        <p>Etwas hilfe nachricht würde anzeigen hier.</p>
      </div>
    );
  }
}
