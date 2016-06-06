import React from 'react';
import {header} from '../../styles/App.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className={header}>
        <h1>Header</h1>
      </nav>
    );
  }
}
