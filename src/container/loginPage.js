import React, { Component } from 'react';
import Login from '../components/login/login';
import Register from '../components/register/register';

export default class BeforeLoginPage extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        const path = this.props.location.pathname;
        if(path.indexOf('/login') !== -1){
            return (
                <div>
                    <Login />
                </div>
            )
        }else if( path.indexOf('/register') !== -1){
            return (
                <div>
                    <Register />
                </div>
            )
        }        
    }
}