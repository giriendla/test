import React, { Component } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import Config from '../../container/config';
import {getEmployees} from '../../service/api';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        console.log("Login form", props);
        this.state = {
            username: "giriy"
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = name => event => {

        console.log("Handle change", event);
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
                <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
                <TextField
                    id="username"
                    label="UserName"
                    className="username"
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                    />
                </Grid>
                <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
                    Sign Up Section
                </Grid>
                    
            </Grid>
        );
    };
}