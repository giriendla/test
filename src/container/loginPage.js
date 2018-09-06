import React, { Component } from 'react';
import Login from '../components/login/login';
import Register from '../components/register/register';
import '../scss/loginStyles.scss';

export default class BeforeLoginPage extends Component{
    constructor(props) {
        super(props);
    };

    checkView() {
        const path = this.props.location.pathname;
        if(path.indexOf('/login') !== -1){
            return (<Login {...this.props} />);
        }else if(path.indexOf('/register') !== -1){
            return (<Register  {...this.props} />);
        }
    }

    render() {
        return (
            <div>
                {this.checkView()}
            </div>
        );        
    }
}