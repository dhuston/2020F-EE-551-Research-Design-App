import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'

import Home from '../Home'
import Goals from '../Goals'
import Analyses from '../Analyses'
import Studies from '../Studies'
import Datasets from '../Datasets'


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
            <Route path="/datasets" component={Datasets} />
          </Switch>
      </Router>
    );
  }
}

export default Main;