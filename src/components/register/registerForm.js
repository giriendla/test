import React, { Component } from 'react';
import axios from 'axios';
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import Config from '../../container/config';
import { Scrollbars } from 'react-custom-scrollbars';
import green from '@material-ui/core/colors/green';
import './register.scss';


const styles = theme => ({
    button: {
        color: "#ffffff"
    },
    input: {
        display: 'none',
    },
    fullWidth: {
        width: '100%',
    },
    loginButton: {
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "15px",
        paddingRight: "15px",
        fontFamily: "Segoeui-regular",
        textTransform: "uppercase",
        letterSpacing: "4px",
        fontSize: "16px",
        borderRadius: "0px",
        marginTop: "35px",
        fontWeight: "bold",
    },
    errorText: {
        fontSize: '10px',
        color: 'red',
    }
});
const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#673ab7',
      },
    },
  });


export default class RegisterForm extends Component {

    constructor(props) {
        super(props);
        console.log("Register form", props);
        this.state = {
            firstname: "",
            firstname_error: '',
            lastname_error: '',
            phone_error: '',
            email_error: '',
            email: '',
            street: '',
            street_error: '',
            city: '', city_error: '',
            state: '', state_error: '',
            country: '', country_error: '',
            pin: '', pin_error: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = name => event => {

        this.setState({
            [name]: event.target.value,
        });
        if (name != '') {
            let errName = name + '_error'
            console.log("Handle change", event, name, errName);
            this.setState({
                [errName]: '',
            });
        }
    };
    handleSubmit = (event) => {
        event.preventDefault();
        let formValid = true;
        if (!this.state.firstname) {
            this.setState({ firstname_error: "First Name is required" });
            formValid = false;
        }
        if (!this.state.lastname) {
            this.setState({ lastname_error: "Last Name is required" });
            formValid = false;
        }
        if (!this.state.phone) {
            this.setState({ phone_error: "Phone number is required" });
            formValid = false;
        }
        let reg = /^\d+$/;
        let no = reg.test(this.state.phone_error);
        if (no) {
            this.setState({ phone_error: "Phone number should consists of only numbers" });
            formValid = false;
        }

        if (!this.state.email) {
            this.setState({ email_error: "Email is required" });
            formValid = false;
        }
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = re.test(this.state.email);
        console.log('result', result)
        if (!result) {
            this.setState({ email_error: "Valid email is required" });
            formValid = false;
        }
        if (!this.state.street) {
            this.setState({ street_error: "Street Name is required" });
            formValid = false;
        }
        if (!this.state.city) {
            this.setState({ city_error: "City is required" });
            formValid = false;
        }
        if (!this.state.state) {
            this.setState({ state_error: "State Name is required" });
            formValid = false;
        }
        if (!this.state.country) {
            this.setState({ country_error: "Country Name is required" });
            formValid = false;
        }
        if (!this.state.pin) {
            this.setState({ pin_error: "Pin number is required" });
            formValid = false;
        }
        let reg1 = /^\d+$/;
        let pinno = reg1.test(this.state.pin_error);
        if (pinno) {
            this.setState({ pin_error: "Pin should consists of only numbers" });
            formValid = false;
        }
        if (formValid) {
            this.saveForm();
            window.location.pathname = "/login";
        }
    }
    saveForm = (event) => {
        console.log('Save form')
    }


    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container className="registrationSection" >
                    <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
                        <Typography className="loginHeading preLoginHeading" variant="title" gutterBottom align="center">
                            Vendor Registration
                        </Typography>
                    </Grid>
                    {/* <Grid item sm={12} md={12} lg={12} xs={12} xl={12}></Grid> */}
                    <Scrollbars style={{ height: '350px' }} className="semiScroll">
                        <Grid container className="registrationForm" spacing={32}>
                            {/* Sign Up Section */}
                            <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                                <TextField
                                    id="firstname"
                                    label="First Name"
                                    // floatingLabelText="First Name"
                                    className="halfWidth"
                                    value={this.state.firstname}
                                    onChange={this.handleChange('firstname')}
                                    margin="normal"
                                    fullWidth
                                    helperText={this.state.firstname_error}
                                    error={(this.state.firstname_error == "") ? false : true}
                                />
                            </Grid>
                            <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                                <TextField
                                    id="lastname"
                                    label="Last Name"
                                    // floatingLabelText="Last Name"
                                    className="halfWidth"
                                    value={this.state.lastname}
                                    onChange={this.handleChange('lastname')}
                                    margin="normal"
                                    fullWidth
                                    helperText={this.state.lastname_error}
                                    error={(this.state.lastname_error == "") ? false : true}
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
                                <TextField
                                    id="phone"
                                    label="Phone"
                                    // floatingLabelText="Phone"
                                    className="fullWidth"
                                    value={this.state.phone}
                                    onChange={this.handleChange('phone')}
                                    margin="normal"
                                    maxLength="10"
                                    fullWidth
                                    style={styles.fullWidth}
                                    helperText={this.state.phone_error}
                                    error={(this.state.phone_error == "") ? false : true}
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    // floatingLabelText="Email"
                                    className="fullWidth"
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    margin="normal"
                                    fullWidth
                                    helperText={this.state.email_error}
                                    error={(this.state.email_error == "") ? false : true}
                                />
                            </Grid>
                            {/* <Grid container> */}
                            <div style={{ paddingLeft: '15px', paddingTop: '20px' }} >Address</div>
                            
                            <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
                                <TextField
                                    id="street"
                                    label="Street"
                                    // floatingLabelText="Street"
                                    className="fullWidth"
                                    value={this.state.street}
                                    onChange={this.handleChange('street')}
                                    margin="normal"
                                    fullWidth
                                    helperText={this.state.state_error}
                                    error={(this.state.state_error == "") ? false : true}
                                />
                            </Grid>
                            <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                                <TextField
                                    id="city"
                                    label="City"
                                    // floatingLabelText="City"
                                    className="halfWidth"
                                    value={this.state.city}
                                    onChange={this.handleChange('city')}
                                    margin="normal"
                                    fullWidth
                                    helperText={this.state.city_error}
                                    error={(this.state.city_error == "") ? false : true}
                                />
                            </Grid>
                            <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                                <TextField
                                    id="state"
                                    label="State"
                                    // floatingLabelText="State"
                                    className="halfWidth"
                                    value={this.state.state}
                                    onChange={this.handleChange('state')}
                                    margin="normal"
                                    fullWidth
                                    helperText={this.state.state_error}
                                    error={(this.state.state_error == "") ? false : true}
                                />
                            </Grid>
                            <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                                <TextField
                                    id="country"
                                    label="Country"
                                    // floatingLabelText="Country"
                                    className="halfWidth"
                                    value={this.state.country}
                                    onChange={this.handleChange('country')}
                                    margin="normal"
                                    fullWidth
                                    helperText={this.state.country_error}
                                    error={(this.state.country_error == "") ? false : true}
                                />
                            </Grid>
                            <Grid item sm={6} md={6} lg={6} xs={12} xl={6}>
                                <TextField
                                    id="pin"
                                    label="Pin"
                                    // floatingLabelText="Pin"
                                    className="halfWidth"
                                    value={this.state.pin}
                                    maxLength="6"
                                    onChange={this.handleChange('pin')}
                                    margin="normal"
                                    fullWidth
                                    helperText={this.state.pin_error}
                                    error={(this.state.pin_error == "") ? false : true}
                                />
                            </Grid>
                            {/* </Grid> */}

                        </Grid>
                    </Scrollbars>
                    <Grid container className="buttonsHolder1" justify="center" >
                        {/* <Grid item xs={12} sm={6} md={6} className="">  */}
                        <Button href="./register" style={{marginRight: '20px'}} className="btn btn-primary  mar-large-top" onClick={this.handleSubmit}>
                            Register
                        </Button>
                        <Button href="./login" className="btn btn-secondary  mar-large-top">
                            Cancel
                        </Button>
                    </Grid>

                </Grid>
            </MuiThemeProvider>
        );
    };
}

// export default withStyles(styles)(LoginForm);
