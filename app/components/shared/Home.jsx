import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
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
