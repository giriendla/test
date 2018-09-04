import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from './components/_/navigation';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Config from './container/config';
import Appheader from './components/_/header';
import Approute from './components/_/router';
import {Footer} from './components/_/elements';
import Root from './container/root';
import './App.css';

class App extends Component {
  static propTypes = {}
  render() {    
    return (
      <Router>
        <Grid className="mainContainer">
          <Root />
        </Grid>
      </Router>
    );
  }
}



const mapStateToProps = state => {
  const obj = state;
  return obj;
}



export default connect(mapStateToProps, null)(App);
