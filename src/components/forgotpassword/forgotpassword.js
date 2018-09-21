import React, { Component } from 'react';
import { Grid, Menu, MenuItem, TextField, Button, Typography } from '@material-ui/core';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

import './forgotpassword.scss';

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

  export default class Forgotpassword extends Component {
    constructor(props) {
        super(props);
        console.log("Register form", props);
        this.state = {
            email: "",
            email_error: false,
        }
        // this.handleChange = this.handleChange.bind(this);
    }
    handleChange = name => event => {
        console.log(name,
            ">>>>", this.state.newpassword, this.state.confirmpassword);

        this.setState({
            [name]: event.target.value,
        });
        if (name != '') {
            let errName = name + '_error'
            console.log("Handle change", event, name, errName);
            this.setState({
                [errName]: false,
            });
        }
    };
    submitMail = (event) => {
        event.preventDefault();
        let formValid = true;
        if (!this.state.email) {
            this.setState({ email_error: true });
            formValid = false;
        }
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = re.test(this.state.email);
        console.log('result', result)
        if (!result) {
            this.setState({ email_error: "Valid email is required" });
            formValid = false;
        }

        if(formValid){
            window.location.pathname = "/resetpassword";
            console.log('submitMail');
        }
    }
    render() {

        return (
            <Grid container>
                <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
                    <Typography className="loginHeading preLoginHeading" variant="title" gutterBottom align="center">
                        Forgot Password
                    </Typography>
                </Grid>
                <Grid className="section" item>
                    <TextField
                        id="email"
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        placeholder="Enter your email"
                        type="email"
                        fullWidth
                        margin="normal"
                        maxLength="10"
                        helperText={this.state.email_error}
                        error={(this.state.email_error == "") ? false : true}
                        />
                    <MuiThemeProvider theme={theme}>
                        <Button style={{marginRight: '20px'}} className="btn btn-primary  mar-large-top" onClick={this.submitMail}>
                            Submit
                        </Button>
                        <Button href="./login" className="btn btn-secondary  mar-large-top">
                            Cancel
                        </Button>
                    </MuiThemeProvider>
                </Grid>                  
            </Grid>            
        );
    };
}