import React, { Component } from 'react';
import { Grid, Menu, MenuItem, TextField, Button, Typography } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../_/navigation';
import Config from '../../container/config';

import './forgotpassword.scss';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        console.log("Register form", props);
        this.state = {
            newpassword: "",
            newpassword_error: false,
            confirmpassword: '',
            confirmpassword_error: false,
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

    resetPwd = (event) => {
        event.preventDefault();
        console.log(">>>>", this.state.newpassword, this.state.confirmpassword );
        let formValid = true;
        if (!this.state.newpassword) {
            this.setState({ newpassword_error: true });
            formValid = false;
        }
        if (!this.state.confirmpassword) {
            this.setState({ confirmpassword_error: true });
            formValid = false;
        }
        if (formValid) {
            console.log('resetPwd');
        }
    }

    render() {
        return (
            <Grid container className="forgotPwdBlock1" >
                <Typography className="loginHeading" variant="title" gutterBottom align="center">
                    Reset Password
                    </Typography>
                <Grid item sm={12} md={12} lg={12} xs={12} xl={12} className="forgotPwdBlock2" >
                    <TextField
                        id="newpassword"
                        label="New Password"
                        className=""
                        value={this.state.newpassword}
                        onChange={this.handleChange('newpassword')}
                        // onChange={(event, newValue) => this.setState({ newpassword: newValue, newpassword_error: false })}
                        margin="normal"
                        maxLength="10"
                        error={this.state.newpassword_error}
                    />
                    <div>
                        {this.state.newpassword_error && <span className="errorText" >{this.state.email_error} Enter new password</span>}
                    </div>
                    <TextField
                        id="confirmpassword"
                        label="Confirm Password"
                        className=""
                        value={this.state.confirmpassword}
                        onChange={this.handleChange('confirmpassword')}
                        // onChange={(event, newValue) => this.setState({ confirmpassword: newValue, confirmpassword_error: false })}
                        margin="normal"
                        maxLength="10"
                        error={this.state.confirmpassword_error}
                    />
                    <div>
                        {this.state.confirmpassword_error && <span className="errorText" >{this.state.email_error} Confirm password </span>}
                    </div>

                    <div className="errorText" >{this.state.email_error}</div>
                    <Button variant="contained" color="primary" className="loginButton"
                        onClick={this.resetPwd} style={{ backgroundColor: '#4caf50', color: '#000' }} >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        );
    };
}