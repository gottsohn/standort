import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom';
import App from './App.js';
import Home from './components/shared/Home.jsx';
import Login from './components/user/Login.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Profile from './components/user/Profile.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
injectTapEventPlugin();

render((
<MuiThemeProvider muiTheme={getMuiTheme()}>
  <Router history={browserHistory}>
    <Route component={App} path="/">
      <IndexRoute component={Home}/>
      <Route component={Login} path="/login"/>
      <Route component={Profile} path="/users/:id"/>
    </Route>
  </Router>
</MuiThemeProvider>), document.getElementById('root'));
