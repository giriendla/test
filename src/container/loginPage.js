import React, {Component, Fragment} from 'react';
import Login from '../components/login/login';
import Register from '../components/register/register';
import { Grid, TextField, Hidden } from '@material-ui/core';
import Config from './config';
import Forgotpassword from '../components/forgotpassword/forgotpassword';
import Resetpassword from '../components/forgotpassword/resetPassword';

import '../scss/loginStyles.scss';

export default class BeforeLoginPage extends Component {
  constructor(props) {
    super(props);
  };

  checkView() {
    const path = this.props.location.pathname;
    if (path.indexOf('/login') !== -1) {
      return (<Login {...this.props}/>);
    } else if (path.indexOf('/register') !== -1) {
      return (<Register {...this.props}/>);
    } else if (path.indexOf('/forgotpassword') !== -1) {
      return (<Forgotpassword {...this.props}/>);
    } else if (path.indexOf('/resetpassword') !== -1) {
      return (<Resetpassword {...this.props}/>);
    } else if (path.indexOf('/') !== -1) {
      return (
        <div><Login {...this.props}/></div>
      );
    }
  }

  render() {
    return (
      <Grid
        className="loginSection"
        container
        spacing={16}
        direction="row"
        justify="space-between"
        alignItems="stretch">
        <Hidden xsDown>
          <Grid item xs={12} sm={6} md={7} lg={7} className="loginSliderContainer">
            <div className="slideImageSection">
              <img src={Config.images + "kiosk.png"}/>
            </div>
            <div className="loginSliderMessage">
              <p>Touchscreen visitor management designed for senior living.</p>
            </div>
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={6} md={5} lg={5} className="loginFormContainer">
          <div className="logoSection">
            <img src={Config.images + "logo.png"}/>
          </div>
          <div className="loginFormHolder">
            <Fragment>
              {this.checkView()}
            </Fragment>
          </div>
        </Grid>
      </Grid>
    );
  }
}