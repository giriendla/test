import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import Config from '../../container/config';
import {Grid, TextField, Button, Typography} from '@material-ui/core';

const forms = [
    "Company Contact for Compliance", 
    "Company Branch/Local Office Information", 
    "Corporate Office Information", 
    "Billing Location Information", 
    "Service Type Your Company Offer"];

class CompanyContactForm extends Component{
    constructor(props){
        super(props);
    }

    componentWillUnmount() {
        alert("Company Contact UnMount");
    }
    render() {
        return(
            <Fragment>Contact Form</Fragment>
        )
    }
}
class CompanyOfficeForm extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <Fragment>Company Office</Fragment>
        )
    }
}
class CorporateOfficeForm extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <Fragment>Corporate Office</Fragment>
        )
    }
}
class BillingAddressForm extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <Fragment>Billing Address Form</Fragment>
        )
    }
}
class ServiceTypeForm extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <Fragment>Service Type </Fragment>
        )
    }
}

export {CompanyContactForm, CompanyOfficeForm, CorporateOfficeForm, BillingAddressForm,ServiceTypeForm};