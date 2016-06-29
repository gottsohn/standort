import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from './App.js';
import Home from './components/pages/Home.jsx';
import Search from './components/pages/Search.jsx';
import Login from './components/pages/Login.jsx';
import Profile from './components/pages/Profile.jsx';

injectTapEventPlugin();

render((<MuiThemeProvider muiTheme={getMuiTheme()}>
          <Router history={browserHistory}>
            <Route component={App} path="/">
              <IndexRoute component={Home}/>
              <Route component={Login} path="/login"/>
              <Route component={Search} path="/search"/>
              <Route component={Profile} path="/users/:id"/>
            </Route>
          </Router>
        </MuiThemeProvider>),
        document.getElementById('root'));
