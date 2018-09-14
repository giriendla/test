import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import { TextField, Button, Typography, Grid, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import { matchPath } from 'react-router-dom';


import "./account.scss";

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            // placeholder="Phone"
            showMask={true}
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

export default class AccountForm extends Component {
    constructor(props) {
        super(props);
        console.log("Account form", props);
        
        this.state = {
            firstname: "",
            firstname_error: false,
            showLabel: false,
            id: null
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
    handlePhoneNo = name => event => {
        console.log(name, ">>>>", event.target.value, event.target.value.length);
        if (event.target.value.length === 0) {
            this.setState({ showLabel: false });
        } else {
            this.setState({ showLabel: true });
        }
        this.setState({
            [name]: event.target.value,
        });
        if (name !== '') {
            let errName = name + '_error'
            this.setState({
                [errName]: false
            });
        }
    };
    handleUpdate = (event) => {
        event.preventDefault();
        let formValid = true;
        if (!this.state.firstname) {
            this.setState({ firstname_error: true });
            formValid = false;
        }
        if (!this.state.lastname) {
            this.setState({ lastname_error: true });
            formValid = false;
        }
        if (!this.state.phone) {
            this.setState({ phone_error: true });
            formValid = false;
        }
        if (!this.state.email) {
            this.setState({ email_error: true });
            formValid = false;
        }
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = re.test(this.state.email);
        console.log('result', result)
        if (!result) {
            this.setState({ email_error: true });
            formValid = false;
        }
        if (!this.state.state) {
            this.setState({ state_error: true });
            formValid = false;
        }
        if (!this.state.billingAddress) {
            this.setState({ billingAddress_error: true });
            formValid = false;
        }
        if (!this.state.shippingAddress) {
            this.setState({ shippingAddress_error: true });
            formValid = false;
        }
        console.log('handleUpdate');
    }
    componentDidMount() {
        this.getParams();
    }
    getParams () {
        const match = matchPath(this.props.history.location.pathname, {
            path: '/account/edit/:id',
            exact: true,
            strict: false
        });
        this.setState({ id: (match !== null || undefined && match.params !== null || undefined) ? match.params.id : null});
    }

    render() {      
        return (
            <Grid container className="accountBlock" >
                <Grid container className="header" justify="flex-start" >
                    {/* <Grid item xs={12} sm={6} md={6} > */}
                    <Grid item>
                        <Typography className="Heading" variant="title" gutterBottom align="center">
                            Account Edit Form - {this.state.id}
                        </Typography>
                    </Grid>

                </Grid>
                <Grid container className="formBlock"  >
                    <div>
                        <span className="formTitle" >Sugar ID : </span>
                        <span className="formDescp"> 82f72939-735e-53a2-0944-5418c4edae2a</span>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="" >
                    {/* <div className="formDescp" > */}
                    <TextField
                        id="firstname"
                        label="First Name"
                        className="formFont"
                        value={this.state.firstname}
                        onChange={this.handleChange('firstname')}
                        margin="normal"
                        maxLength="100"
                        error={this.state.firstname_error}
                    />
                    {/* <div>
                        {this.state.firstname_error && <span className="errorText" > First name is required</span>}
                    </div> */}
                    {/* </div> */}
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="" >
                    {/* <div className="formDescp" > */}
                    <TextField
                        id="lastname"
                        label="Last Name"
                        className="formFont"
                        value={this.state.lastname}
                        onChange={this.handleChange('lastname')}
                        // onChange={(event, newValue) => this.setState({ lastname: newValue, lastname_error: false })}
                        margin="normal"
                        maxLength="100"
                        error={this.state.lastname_error}
                    />
                    {/* <div>
                        {this.state.lastname_error && <span className="errorText" > First name is required</span>}
                    </div> */}
                    {/* </div> */}
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="" >
                    {/* <MaskedInput
                        // {...other}
                        // ref={inputRef}
                        onChange={this.handleChange('phone')}
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        placeholderChar={'\u2000'}
                        showMask
                    /> */}
                    <div className="MuiFormControl-root-159 MuiFormControl-marginNormal-160 formFont">
                        {/* <InputLabel htmlFor="formatted-text-mask-input">Phone</InputLabel> */}
                        {this.state.showLabel && <label className="MuiFormLabel-root-168 MuiFormLabel-filled-172 MuiInputLabel-root-163 MuiInputLabel-formControl-164 MuiInputLabel-animated-167 MuiInputLabel-shrink-166" data-shrink="true" >Phone</label>}
                        <div className="MuiInput-root-175 MuiInput-formControl-176 MuiInput-underline-179">
                            <Input
                                name="Phone"
                                // label="Phone"
                                required={this.state.phone_error}
                                value={this.state.phone}
                                onChange={this.handlePhoneNo('phone')}
                                id="formatted-text-mask-input"
                                inputComponent={TextMaskCustom}
                                error={this.state.phone_error}
                            />
                        </div>
                        {/* <div>
                            {this.state.phone_error && <span className="errorText" > Phone number is required</span>}
                        </div> */}
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="" >
                    {/* <div className="formDescp" > */}
                    <TextField
                        id="email"
                        label="Email"
                        className="formFont"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        // onChange={(event, newValue) => this.setState({ email: newValue, email_error: false })}
                        margin="normal"
                        maxLength="20"
                        error={this.state.email_error}
                    />
                    {/* <div>
                        {this.state.email_error && <span className="errorText" > email is required</span>}
                    </div> */}
                    {/* </div> */}
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="" >
                    <TextField
                        id="state"
                        label="US State"
                        className="formFont"
                        value={this.state.state}
                        onChange={this.handleChange('state')}
                        // onChange={(event, newValue) => this.setState({ state: newValue, state_error: false })}
                        margin="normal"
                        maxLength="10"
                        error={this.state.state_error}
                    />
                    {/* <div>
                        {this.state.state_error && <span className="errorText" > State is required</span>}
                    </div> */}
                </Grid>

                <Grid container className="addressBlock" >
                    <Grid item xs={12} sm={12} md={12} className="formTitle">
                        Address
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                        <div className="formDescp" >
                            <TextField
                                id="billingAddress"
                                label="Billing Address"
                                className=""
                                multiline={true}
                                rows='5'
                                value={this.state.billingAddress}
                                onChange={this.handleChange('billingAddress')}
                                // onChange={(event, newValue) => this.setState({ state: newValue, state_error: false })}
                                margin="normal"
                                maxLength="10"
                                error={this.state.billingAddress_error}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                        <div className="formDescp" >
                            <TextField
                                id="shippingAddress"
                                label="Shipping Address"
                                className=""
                                multiline={true}
                                rows='5'
                                value={this.state.shippingAddress}
                                onChange={this.handleChange('shippingAddress')}
                                margin="normal"
                                maxLength="10"
                                error={this.state.shippingAddress_error}
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid container className="buttonsHolder" justify="center" >
                    {/* <Grid item xs={12} sm={6} md={6} className="">  */}
                    <Button variant="contained" color="primary" className="greenBtn"
                        onClick={this.handleUpdate} style={{ marginRight: '20px' }}
                    >
                        Update
                    </Button>
                    {/* </Grid>
                    <Grid item xs={12} sm={6} md={6} className=""> */}
                    <Button variant="outlined" className="outlinedBtn" >
                        Cancel
                        </Button>
                    {/* </Grid> */}
                </Grid>
            </Grid>
        );
    };
}