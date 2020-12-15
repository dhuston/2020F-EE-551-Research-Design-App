import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'

import Home from '../Home'
import Goals from '../Goals'

class Main extends Component {
  render() {
    return (
      <Router>
          {/* <Redirect to='/home' /> */}
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" component={Home} />
            <Route path="/goals" component={Goals} />
          </Switch>
      </Router>
    );
  }
}

export default Main;