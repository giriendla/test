import React, { Component } from 'react';
import axios from 'axios';
import { Grid, TextField, Hidden } from '@material-ui/core';
import Config from '../../container/config';
import {getEmployees} from '../../service/api';
import './login.scss';
import LoginForm from './loginForm';

export default class Login extends Component {

    constructor(props) {
        super(props);
        console.log("At Login Container", props);
        this.state = {
            employees: []
        }
    }
    componentWillMount() {
        console.log("Loading Component");
        
    }
    componentDidMount() {
        console.log("Component loaded");
    }

    getEmpoyeesList() {
        axios
        .get(axios.getEmployees())
        .then((response) => {
            this.setState({employees: response.data});
            console.log("At First Response", this.state);
        })
        .catch(function (error) {
            console.log("At First Error", error);
        });
    }

    render() {                
        return (
            <Grid 
                className="loginSection" 
                container 
                spacing={16} 
                direction="row"
                justify="space-between"
                alignItems="stretch">
                <Hidden xsDown>
                    <Grid item xs={12} sm={6} md={7} lg={7} className="loginSliderContainer">
                        <div className="slideImageSection">
                            <img src={Config.images + "kiosk.png"} />
                        </div>
                        <div className="loginSliderMessage">
                            <p>Touchscreen visitor management
                            designed for senior living.</p>
                        </div>
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={6} md={5} lg={5} className="loginFormContainer">
                    <div className="logoSection">
                        <img src={Config.images + "logo.png"} />
                    </div>
                    <div className="loginFormHolder">
                        <LoginForm {...this.props} />
                    </div>
                </Grid>
            </Grid>
        );
    };
}