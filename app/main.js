import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom';
import App from './components/main.jsx';
import Home from '..components/shared/Home.jsx';
import Login from './components/user/Login.jsx';
import Profile from './components/user/Profile.jsx';

import {} from './styles/styles.css';
//require('./styles/style.css');

render((
  <Router history={browserHistory}>
    <Route component={App} path="/">
      <IndexRoute component={Home}/>
      <Route component={Login} path="/login"/>
      <Route component={Profile} path="/user/:id"/>
    </Route>
  </Router> ), document.getElementById('container'));
