import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from './components/_/navigation';
import Config from './container/config';
import Appheader from './components/_/header';
import Approute from './components/_/router';
import {Footer} from './components/_/elements';
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid className="mainContainer">
        <Appheader />
        <Approute />
        <Footer />
      </Grid>
    );
  }
}




export default App;
