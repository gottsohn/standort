import React from 'react';
import Header from './shared/Header.jsx';
import {container} from '../styles/App.css';

export default class Main extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     title: 'Standort'
   };
 }

 getChildContext() {
    return {
      title: this.state.title
    };
  }

 render() {
    return (
      <div>
        <Header title={this.state.title} />
        <div className={container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.element.isRequired
};

Main.childContextTypes = {
  title: React.PropTypes.string.isRequired
};
