import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

import { TextField, Button, Typography, Grid, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../_/navigation';
import Config from '../../container/config';

import "./account.scss";

export default class AccountForm extends Component {
    render() {
        return (
            <Grid container className="accountBlock" >
                <Grid container className="header" justify="flex-start" >
                    {/* <Grid item xs={12} sm={6} md={6} > */}
                    <Grid item>
                        <Typography className="Heading" variant="title" gutterBottom align="center">
                            Account Edit
                        </Typography>
                    </Grid>

                </Grid>
                <Grid container className="formBlock"  >
                    <div className="formTitle" > Sugar ID </div>
                    <div className="formDescp" > 
                        <TextField
                            id="firstname"
                            label="First Name"
                            className=""
                            value={this.state.firstname}
                            onChange={this.handleChange('firstname')}
                            // onChange={(event, newValue) => this.setState({ firstname: newValue, firstname_error: false })}
                            margin="normal"
                            maxLength="10"
                            error={this.state.firstname_error}
                        />
                        <div>
                            {this.state.firstname_error && <span className="errorText" > Enter new password</span>}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="formBlock" >
                    <div className="formTitle" > Name </div>
                    <div className="formDescp" > Florida Best Hearing - New Port RicheyName </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="formBlock" >
                    <div className="formTitle" > Phone </div>
                    <div className="formDescp" > (123) - 123 - 4123 </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="formBlock" >
                    <div className="formTitle" > Email </div>
                    <div className="formDescp" > newportrichey@accushield.com </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} className="formBlock" >
                    <div className="formTitle" > US State </div>
                    <div className="formDescp" > Florida, New Jersey, New York </div>
                </Grid>

                <div className="formTitle">
                    Address
                </div>
                <Grid container xs={12} sm={12} md={12} className="formBlock" >
                    <Grid xs={12} sm={6} md={6} >
                        <div className="formSubTitle" >Billing Address</div>
                        <div className="formDescp" >P.O. Box 942873 Sacramento, CA 94273-0001</div>
                    </Grid>
                    <Grid xs={12} sm={6} md={6} >
                        <div className="formSubTitle" >Shipping Address</div>
                        <div className="formDescp" >District 2 1657 Riverside Drive Redding 530-225-3426</div>
                    </Grid>
                </Grid>
            </Grid>
        );
    };
}