import React from 'react';
import Header from './shared/Header.jsx';

export default class Main extends React.Component {
  propTypes: {
   children: React.PropTypes.element
 }

 constructor(props) {
   super(props);
 }

 render() {
    return (
      <div>
        <Header />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
