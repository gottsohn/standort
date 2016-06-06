import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'foo'
    };
  }

  render() {
    return (
      <div>
        <h1>Haus</h1>
      </div>
    );
  }
}
