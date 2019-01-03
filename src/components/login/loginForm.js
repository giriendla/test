import React, {Component} from 'react';
import axios from 'axios';
import {
  Grid, 
  TextField, 
  Button, 
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
} from '@material-ui/core';
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Config from '../../container/config';
import {getEmployees} from '../../service/api';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import PasswordField from 'material-ui-password-field'

import CommonService from '../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';

const styles = theme => ({
  button: {
    color: "#ffffff"
  },
  input: {
    display: 'none'
  }
});
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: '#673ab7'
    }
  }
});
class LoginForm extends Component {

  constructor(props) {
    super(props);
    console.log("Login form", props);
    this.state = {
      email: "",
      email_error: "",
      password: "",
      password_error: "",
      showPassword: false,
    }
    this.handleChange = this
      .handleChange
      .bind(this);
    this.loginUser = this
      .loginUser
      .bind(this);
  }
  handleChange = name => event => {
    // console.log("Handle change", event.target.value);
    event.persist();
    this.setState({
      [name]: event.target.value,
      [name + "_error"]: (event.target.value)
        ? ""
        : name + " is required!"
    });
    // this.props.updateData({username: this.state.username, password: this.state.password});
  };

  componentDidMount() {
    
  }
  componentWillReceiveProps(props) {
    
  }

  loginUser(event) {
    event.preventDefault();
    let formValid = true;
    if (!this.state.email) {
      this.setState({"email_error": "email is required!"});
      formValid = false;
    }
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(this.state.email);
    console.log('result', result)
    if (!result) {
      this.setState({email_error: "Valid email is required"});
      formValid = false;
    }
    if (!this.state.password) {
      this.setState({"password_error": "password is required!"});
      formValid = false;
    }

    if (formValid) {      
      this.props.updateData({email: this.state.email, password: this.state.password});
    }
  }


  render() {
    const {classes} = this.props;
    return (
      <Grid container>
        <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
          <Typography
            className="loginHeading preLoginHeading"
            variant="title"
            gutterBottom
            align="center">
            Vendor Login
          </Typography>
        </Grid>
        <Grid container spacing={24} justify="center">
          <Grid className="section">
            <form onSubmit={this.loginUser}>
              <Grid container spacing={24} justify="center">
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="username"
                    label="Email"
                    type="email"
                    className="username"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    helperText={this.state.email_error}
                    error={(this.state.email_error == "")
                    ? false
                    : true}
                    fullWidth/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="password"
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    type="password"
                    fullWidth
                    margin="normal"
                    helperText={this.state.password_error}
                    error={(this.state.password_error == "")
                    ? false
                    : true}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MuiThemeProvider theme={theme}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="btn btn-primary loginButton">
                      Login
                    </Button>
                    {/* <div>
                      <Button href="./forgotpassword" color="secondary" className="btn btn-link">Forgot Password</Button>
                    </div> */}
                  </MuiThemeProvider>
                </Grid>
              </Grid>
            </form>
          </Grid>
          {/* <Grid
            className="section signupSection"
            item
            sm={12}
            md={12}
            lg={12}
            xs={12}
            xl={12}>
            <MuiThemeProvider theme={theme}>
              <div className="signupText">Still not registered</div>
              <Button
                href="./register"
                variant="outlined"
                color="primary"
                className="btn btn-secondary signupButton">
                Sign Up
              </Button>
            </MuiThemeProvider>
          </Grid> */}
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(LoginForm);