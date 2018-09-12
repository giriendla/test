import React, { Component } from 'react';
import { Grid, Menu, MenuItem, TextField, Button, Typography } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../_/navigation';
import Config from '../../container/config';

import './forgotpassword.scss';

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
        } else {
            console.log('submitMail');
        }
    }
    render() {
        

        
        return (
            <Grid container className="forgotPwdBlock1" >
                <Grid item sm={12} md={12} lg={12} xs={12} xl={12} className='forgotPwdBlock2' >
                    <Typography className="loginHeading" variant="title" gutterBottom align="center">
                        Forgot Password
                    </Typography>
                    <TextField
                        id="email"
                        label="Email"
                        className=""
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        // onChange={(event, newValue) => this.setState({ email: newValue, email_error: false })}
                        margin="normal"
                        maxLength="10"
                        error={this.state.email_error}
                    />
                    <div>
                        {this.state.email_error && <span className="errorText" >{this.state.email_error} Mail is required</span>}
                    </div>
                    <Button variant="contained" color="primary" className="loginButton"
                        onClick={this.submitMail} style={{ backgroundColor: '#4caf50', color: '#000' }} >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        );
    };
}