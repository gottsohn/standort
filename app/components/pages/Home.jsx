import React from 'react';
import {Link} from 'react-router';
import PublicActions from '../../actions/PublicActions';
// import UserStore from '../../stores/UserStore_';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    PublicActions.setTitle('Home');
    // UserStore.getState().then(this.getUser);
  }

  getUser() {
    // console.log(state);
  }

  render() {
    return (
      <div>
        <h1>Haus</h1>
        <p>{this.context.title}</p>
        <p>Sehen dein context.</p>
        <p>Find more friends <Link to="/search">here</Link>.</p>
      </div>
    );
  }
}
