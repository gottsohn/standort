import React from 'react';
import Header from './components/shared/Header.jsx';
import styles from './App.css';

export default class App extends React.Component {
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
        <div className={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

App.childContextTypes = {
  title: React.PropTypes.string.isRequired
};
