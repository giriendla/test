import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Config from '../../container/config';
import {getEmployees} from '../../service/api';

export default class Login extends Component {

    constructor(props) {
        super(props);

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
                <Grid item xs={12} sm={6} md={7} lg={7} className="loginSliderContainer">
                    <div className="slideImageSection">
                        <img src={Config.images + "kiosk.png"} />
                    </div>
                    <div className="loginSliderMessage">
                        <p>Touchscreen visitor management
                        designed for senior living.</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={5} lg={5} className="loginFormContainer">
                    Login Form
                </Grid>
            </Grid>
        );
    };
}