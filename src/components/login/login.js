import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Grid, TextField, Hidden } from '@material-ui/core';
import Config from '../../container/config';
import {getEmployees} from '../../service/api';
import './login.scss';
import LoginForm from './loginForm';
import CommonService from '../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';

export default class Login extends Component {

    constructor(props) {
        super(props);
        console.log("At Login Container", props);
        this.state = {
            employees: [],
            login: {},
            loader: false
        }
        
    }
    componentWillMount() {
        console.log("Loading Component");
    }
    componentDidMount() {
        console.log("Component loaded");
    }

    loginSubmit = (data) => {
        // debugger;
        this.setState({login: data});

        if(this.state.login.email != "" && this.state.login.password != ""){
            this.setState({loader: true});
        data.service = "login";
        axios
        .post(axios.login(), data)
        .then((response) => {
            debugger;
            this.setState({loader: false});
            let news = [
                "Currently, Time Warner's India-specific CNN-News18 is watched by more people than its CNN International sister network, although both channels are in English.", 
                "According to Network 18, since its inception, the channel has been reaching out to an average of 45 million households every day.", 
                "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready."
            ];
            response['news'] = news;
            CommonService.localStore.set("userData", JSON.stringify(response));
            let ud = CommonService.localStore.get('userData');
            ud = JSON.parse(ud.userData);
            console.log("User Data", ud);
            window.location.href = "/dashboard";
            /* toast.success( "Login successfull", {
                position: toast.POSITION.TOP_CENTER,
                className: 'rotateY animated'
              });
            setTimeout(() => {
            }, 3000); */
            // console.log("At First Response", this.state);
        })
        .catch((error) => {
            debugger;
            this.setState({loader: false});
            toast.error((error !== undefined && error.response.data.message != undefined) ? error.response.data.message : "Failed for some reason", {
                position: toast.POSITION.TOP_CENTER
              });
            // console.log("At First Error", error);
        });
        }
    }

    render() {  
        const { loader, login } = this.state;              
        return (
            <Fragment>
                <LoginForm updateData={this.loginSubmit} {...this.props} />
                {CommonService.renderLoader(loader)}
                <ToastContainer autoClose={5000} />
            </Fragment>
        );
    };
}