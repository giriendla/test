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
            username: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = name => event => {
        console.log("Handle change", event.target.value);
        event.persist();
        this.setState({
          [name]: event.target.value,
        });
      };
    

    render() {  
        const { classes } = this.props;              
        return (
            <Grid container>
                <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
                    <Typography className="loginHeading" variant="title" gutterBottom align="center">
                        Vendor Login
                    </Typography>
                </Grid>
                <Grid className="section" 
                        item>
                    <TextField
                        id="username"
                        label="Username"
                        className="username"
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        margin="normal"
                        fullWidth
                        />
                    <TextField
                        id="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        />
                    <MuiThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" className="loginButton">
                          Login
                        </Button>
                        <div>
                            <Button color="secondary" className="forgotButton">Forgot password</Button>
                        </div>
                    </MuiThemeProvider>
                </Grid>
                <Grid className="section signupSection" item sm={12} md={12} lg={12} xs={12} xl={12}>
                    <MuiThemeProvider theme={theme}>
                        <div className="signupText">Still not registered</div>
                        <Button variant="outlined" color="primary" className="signupButton">
                        Sign Up
                        </Button>
                    </MuiThemeProvider>
                </Grid>
                    
            </Grid>
        );
    };
}

export default withStyles(styles)(LoginForm);