import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'

import Home from './navigation'
import Goals from './goals'
import Analyses from './analyses'
import Studies from './studies'
import Results from './results'


class Main extends Component {
  render() {
    return (
      <Router>
          {/* <Redirect to='/home' /> */}
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" component={Home} />
            <Route path="/goals" component={Goals} />
            <Route path="/analyses" component={Analyses} />
            <Route path="/studies" component={Studies} />
            <Route path="/results" component={Results} />
          </Switch>
      </Router>
    );
  }
}

export default Main;