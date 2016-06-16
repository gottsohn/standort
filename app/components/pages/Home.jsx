import React from 'react';
import PublicActions from '../../actions/PublicActions';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    PublicActions.setTitle('Home');
  }
  
  render() {
    return (
      <div>
        <h1>Haus</h1>
        <p>{this.context.title}</p>
        <p>Sehen dein context.</p>
      </div>
    );
  }
}
