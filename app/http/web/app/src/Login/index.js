import React, { Component } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'



class Main extends Component {
  render() {
    return (
    //   <Router>
          <Redirect to='/home' />
    //   </Router>
    );
  }
}

export default Main;