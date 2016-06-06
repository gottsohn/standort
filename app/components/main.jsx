import React from 'react';
import Header from './shared/Header.jsx';

export default class Main extends React.Component {


 constructor(props) {
   super(props);
   this.propTypes = {
     children: React.PropTypes.element.isRequired
   };
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
