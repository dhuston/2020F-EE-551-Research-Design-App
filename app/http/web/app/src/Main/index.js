import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'

import Home from '../Home'

class Main extends Component {
  render() {
    return (
      <Router>
          {/* <Redirect to='/home' /> */}
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" component={Home} />
          </Switch>
      </Router>
    );
  }
}

export default Main;