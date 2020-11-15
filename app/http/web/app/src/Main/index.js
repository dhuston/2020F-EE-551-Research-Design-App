import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'

import Login from '../Login'
import Home from '../Home'

class Main extends Component {
  render() {
    return (
      <Router>
          {/* <Redirect to='/home' /> */}
          <Switch>
            <Route exact path="/" component={Login} />
            {/* <Route path="/implicit/callback" component={LoginCallback} /> */}
            <Route path="/home" component={Home} />
          </Switch>
      </Router>
    );
  }
}

export default Main;