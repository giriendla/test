import React, { Component } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Config from '../../container/config';
import {getEmployees} from '../../service/api';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';


const styles = theme => ({
    button: {
        color: "#ffffff"   
    },
    input: {
      display: 'none',
    },
  });
const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: {
        main: '#673ab7',
      },
    },
  });

class LoginForm extends Component {

    constructor(props) {
        super(props);
        console.log("Login form", props);
        this.state = {
            username: "",
            username_error: "",
            password: "",
            password_error: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }
    handleChange = name => event => {
        // console.log("Handle change", event.target.value);
        event.persist();
        this.setState({
          [name]: event.target.value,
          [name+"_error"]: (event.target.value) ? "" : name + " is required!"
        });
      };

    loginUser() {
        let formValid = true;
        debugger;
        if(!this.state.username){
            this.setState({"username_error": "username is required!"});
            formValid = false;
        }
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = re.test(this.state.username);
        console.log('result', result)
        if (!result) {
            this.setState({ username_error: "Valid email is required" });
            formValid = false;
        }
        if(!this.state.password){
            this.setState({"password_error": "password is required!"});
            formValid = false;
        }


        if(formValid){
            window.location.pathname = "./dashboard";
        }
    }
    

    render() {  
        const { classes } = this.props;              
        return (
            <Grid container>
                <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
                    <Typography className="loginHeading preLoginHeading" variant="title" gutterBottom align="center">
                        Vendor Login
                    </Typography>
                </Grid>
                <Grid className="section" 
                        item>
                    <TextField
                        id="username"
                        label="Email"
                        type="email"
                        className="username"
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        margin="normal"
                        helperText={this.state.username_error}
                        error={(this.state.username_error == "") ? false : true}
                        fullWidth
                        />

                    <TextField
                        id="password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        placeholder="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        helperText={this.state.password_error}
                        error={(this.state.password_error == "") ? false : true}
                        />
                    <MuiThemeProvider theme={theme}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className="btn btn-primary loginButton"
                            onClick={this.loginUser}>
                          Login
                        </Button>
                        <div>
                            <Button href="./forgotpassword" color="secondary" className="btn btn-link">Forgot Password</Button>
                        </div>
                    </MuiThemeProvider>
                </Grid>
                <Grid className="section signupSection" item sm={12} md={12} lg={12} xs={12} xl={12}>
                    <MuiThemeProvider theme={theme}>
                        <div className="signupText">Still not registered</div>
                        <Button href="./register" variant="outlined" color="primary" className="btn btn-secondary signupButton">
                            Sign Up
                        </Button>
                    </MuiThemeProvider>
                </Grid>
                    
            </Grid>
        );
    };
}

export default withStyles(styles)(LoginForm);