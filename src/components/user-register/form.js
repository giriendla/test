import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Config from '../../container/config';
import {
  Grid,
  TextField,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  Typography,
  Hidden
} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MaskedInput from 'react-text-mask';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import './register.scss';

const forms = ["Company Contact for Compliance", "Company Branch/Local Office Information", "Corporate Office Information", "Billing Location Information", "Service Type Your Company Offer"];

class CompanyContactForm extends Component {
  constructor(props) {
    super(props);
    console.log("All Props at Company Contact Form", props);
    this.state = {
      data: {
        service_label: []
      },
      error: {}
    }
  }
  //   "Corporate Owner", "Branch Location", "Sole Proprietorship", "Franchisee",
  // "Franchisor", "Staffing Agency"
  componentWillUnmount() {
    // alert("Company Contact UnMount");
  }
  componentDidMount() {
    console.log("This Props", this.props.formData);
    // alert('companent mounted');
    //this.fillFormData(this.props.formData());
    this.setState({data: this.props.formData});
  }
  componentWillReceiveProps() {
    this.setState({data: this.props.formData});
    console.log("componentWillReceiveProps", this.state.data);
  }
  fillFormData = (data) => {
    let stateData = this.state.data;
    let newStateData = {...stateData, ...data};
    this.setState({data: newStateData});
    console.log("Filling Form", stateData, newStateData);
  }
  clickMe() {
    // alert("self method");
  }
  updateField = (event, field) => {
    console.log("Updated Value", field, event.target.value);
    let fieldUpdate = this.state;
    fieldUpdate['data'][field] = event.target.value;
    fieldUpdate['error'][field] = (event.target.value)
      ? ""
      : field + " is required!";
    //console.log("Updated ", this.state);
    this.setState(fieldUpdate);
    this
      .props
      .updateContactCompany(this.state.data);
  }
  companyContactHandleCheckboxChange = name => event => {

    // console.log("---Start--- \n\nSelected Checkbox \n", name,
    // event.target.checked, "\n ---End--");
    let service_label = this.state;
    if (event.target.checked) {
      service_label
      .data
        .service_label
        .push(name);
    } else {
      /* console.log("Categores", service_label, service_label.service_label.indexOf(name) > -1); */
      let item = service_label.data
        .service_label
        .indexOf(name);
      if (item > -1) {
        service_label.data
          .service_label
          .splice(item, 1);
      }

      //categories.categories.push(name);
    }
   // console.log("Categore list", this.state);
    this.setState(service_label);
    this
      .props
      .updateContactCompany(this.state.data);
    };
    formatPhoneNumber(phoneNumberString) {
      //debugger;
      var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
      }
      return null
    }
    render() {
      return (
        <Fragment>
          {/* JSON.stringify(this.state) */}
          <Grid container spacing={32}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="first_name"
                label="First Name"
                value={this.state.data.first_name}
                onChange={evt  => {this.updateField(evt, 'first_name')}}
                margin="normal"
                fullWidth
                helperText={this.state.error.first_name}
                error={(this.state.data.first_name !== '')
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="last_name"
                label="Last Name"
                value={this.state.data.last_name}
                onChange={this.updateField('last_name')}
                margin="normal"
                fullWidth
                helperText={this.state.error.last_name}
                error={(this.state.data.last_name !== '')
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="title"
                label="Title"
                value={this.state.data.title}
                onChange={this.updateField('title')}
                margin="normal"
                fullWidth
                helperText={this.state.error.title}
                error={(this.state.data.title !== "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
                id="phone_mobile"
                label="Phone"
                value={this.state.phone}
                onChange={this.updateField('phone_mobile')}
                margin="normal"
                fullWidth
                onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");

                  //check if number length equals to 10
                  if (e.target.value.length <= 10) {
                      //reformat and return phone number
                    }
                    // e.target.value = this.formatPhoneNumber(e.target.value);
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                    e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                }}
                helperText={this.state.error.phone_mobile}
                error={(this.state.error.phone_mobile !== "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="fax"
                label="Fax"
                value={this.state.fax}
                onChange={this.updateField('fax')}
                margin="normal"
                onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                }}
                fullWidth
                helperText={this.state.firstname_error}
                error={(this.state.fax !== "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="email"
                label="Email"
                value={this.state.email}
                onChange={this.updateField('email')}
                margin="normal"
                fullWidth
                helperText={this.state.firstname_error}
                error={(this.state.email !== "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="password"
                label="Password"
                value={this.state.data.password}
                onChange={this.updateField('password')}
                margin="normal"
                fullWidth
                helperText={this.state.error.password}
                error={(this.state.data.password !== "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <b>Submitting As:</b>

              <FormGroup row>
                <FormControlLabel
                  control={< Checkbox checked = {(this.state.data.service_label.indexOf("Corporate Owner") > -1)}
                onChange = {
                  this.companyContactHandleCheckboxChange('Corporate Owner')
                }
                value = "Corporate Owner" color = "primary" />}
                  label="Corporate Owner"/>
                <FormControlLabel
                  control={< Checkbox checked = {(this.state.data.service_label.indexOf("Branch Location") > -1)}
                onChange = {
                  this.companyContactHandleCheckboxChange('Branch Location')
                }
                value = "Branch Location" color = "primary" />}
                  label="Branch Location"/>
                <FormControlLabel
                  control={< Checkbox checked = {(this.state.data.service_label.indexOf("Sole Proprietorship") > -1)}
                onChange = {
                  this.companyContactHandleCheckboxChange('Sole Proprietorship')
                }
                value = "Sole Proprietorship" color = "primary" />}
                  label="Sole Proprietorship"/>
                <FormControlLabel
                  control={< Checkbox checked = {(this.state.data.service_label.indexOf("Franchisee") > -1)}
                onChange = {
                  this.companyContactHandleCheckboxChange('Franchisee')
                }
                value = "Franchisee" color = "primary" />}
                  label="Franchisee"/>
                <FormControlLabel
                  control={< Checkbox checked = {(this.state.data.service_label.indexOf("Franchisor") > -1)}
                onChange = {
                  this.companyContactHandleCheckboxChange('Franchisor')
                }
                value = "Franchisor" color = "primary" />}
                  label="Franchisor"/>
                <FormControlLabel
                  control={< Checkbox checked = {(this.state.data.service_label.indexOf("Staffing Agency") > -1)}
                onChange = {
                  this.companyContactHandleCheckboxChange('Staffing Agency')
                }
                value = "Staffing Agency" color = "primary" />}
                  label="Staffing Agency"/>
              </FormGroup>
            </Grid>
          </Grid>
        </Fragment>
      )
    }
}
class CompanyOfficeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      error: {}
    }
  }
  updateField = field => event => {
    console.log("Updated Value", field, event.target.value);
    let fieldUpdate = this.state;
    fieldUpdate['data'][field] = event.target.value;
    fieldUpdate['error'][field] = (event.target.value)
      ? ""
      : field + " is required!";
    //console.log("Updated ", this.state);
    this.setState(fieldUpdate);
    this.props.updateContactCompany(this.state.data);
  }
  render() {
    return (
      <Fragment>
        {/* JSON.stringify(this.state) */}
        <Grid container spacing={32}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="child_company_name"
              label="Company Name"
              value={this.state.data.child_company_name}
              onChange={this.updateField('child_company_name')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_name}
              error={(this.state.data.child_company_name !== '')
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="child_company_address"
              label="Address"
              multiline
              rows="4"
              margin="normal"
              value={this.state.data.child_company_address}
              onChange={this.updateField('child_company_address')}
              fullWidth
              helperText={this.state.error.child_company_address}
              error={(this.state.data.child_company_address !== '')
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_city"
              label="City"
              value={this.state.data.child_company_city}
              onChange={this.updateField('child_company_city')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_city}
              error={(this.state.data.child_company_city !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_state"
              label="State"
              value={this.state.data.child_company_state}
              onChange={this.updateField('child_company_state')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_state}
              error={(this.state.data.child_company_state !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_zip"
              label="Zip"
              value={this.state.data.child_company_zip}
              onChange={this.updateField('child_company_zip')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_zip}
              error={(this.state.data.child_company_zip !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_contact_mail"
              label="Contact Email"
              value={this.state.data.child_company_contact_mail}
              onChange={this.updateField('child_company_contact_mail')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_contact_mail}
              error={(this.state.data.child_company_contact_mail !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_contact_main_phone"
              label="Phone"
              value={this.state.data.child_company_contact_main_phone}
              onChange={this.updateField('child_company_contact_main_phone')}
              margin="normal"
              fullWidth
              onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
              }}
              helperText={this.state.error.child_company_contact_main_phone}
              error={(this.state.data.child_company_contact_main_phone !== "")
              ? false
              : true}/>
              {JSON.stringify(this.state.data.child_company_contact_main_phone)}
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_contact_name"
              label="Contact Name"
              value={this.state.data.child_company_contact_name}
              onChange={this.updateField('child_company_contact_name')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_contact_name}
              error={(this.state.data.child_company_contact_name !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="child_company_contact_title"
              label="Title"
              value={this.state.data.child_company_contact_title}
              onChange={this.updateField('child_company_contact_title')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_contact_title}
              error={(this.state.data.child_company_contact_title !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="child_company_contact_phone"
              label="Contact Phone"
              value={this.state.data.child_company_contact_phone}
              onChange={this.updateField('child_company_contact_phone')}
              margin="normal"
              fullWidth
              onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
              }}
              helperText={this.state.error.child_company_contact_phone}
              error={(this.state.data.child_company_contact_phone !== "")
              ? false
              : true}/>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}
class CorporateOfficeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      error: {}
    }
  }
  updateField = field => event => {
    console.log("Updated Value", field, event.target.value);
    let fieldUpdate = this.state;
    fieldUpdate['data'][field] = event.target.value;
    fieldUpdate['error'][field] = (event.target.value)
      ? ""
      : field + " is required!";
    //console.log("Updated ", this.state);
    this.setState(fieldUpdate);
    this.props.updateContactCompany(this.state.data);
  }
  render() {
    return (
      <Fragment>
        {/* JSON.stringify(this.state) */}
        <Grid container spacing={32}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="child_company_name"
              label="Company Name"
              value={this.state.data.child_company_name}
              onChange={this.updateField('child_company_name')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_name}
              error={(this.state.data.child_company_name !== '')
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="child_company_address"
              label="Address"
              multiline
              rows="4"
              margin="normal"
              value={this.state.data.child_company_address}
              onChange={this.updateField('child_company_address')}
              fullWidth
              helperText={this.state.error.child_company_address}
              error={(this.state.data.child_company_address !== '')
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_city"
              label="City"
              value={this.state.data.child_company_city}
              onChange={this.updateField('child_company_city')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_city}
              error={(this.state.data.child_company_city !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_state"
              label="State"
              value={this.state.data.child_company_state}
              onChange={this.updateField('child_company_state')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_state}
              error={(this.state.data.child_company_state !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_zip"
              label="Zip"
              value={this.state.data.child_company_zip}
              onChange={this.updateField('child_company_zip')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_zip}
              error={(this.state.data.child_company_zip !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_contact_mail"
              label="Contact Email"
              value={this.state.data.child_company_contact_mail}
              onChange={this.updateField('child_company_contact_mail')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_contact_mail}
              error={(this.state.data.child_company_contact_mail !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_contact_main_phone"
              label="Phone"
              value={this.state.data.child_company_contact_main_phone}
              onChange={this.updateField('child_company_contact_main_phone')}
              margin="normal"
              fullWidth
              onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
              }}
              helperText={this.state.error.child_company_contact_main_phone}
              error={(this.state.data.child_company_contact_main_phone !== "")
              ? false
              : true}/>
              {JSON.stringify(this.state.data.child_company_contact_main_phone)}
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_contact_name"
              label="Contact Name"
              value={this.state.data.child_company_contact_name}
              onChange={this.updateField('child_company_contact_name')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_contact_name}
              error={(this.state.data.child_company_contact_name !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="child_company_contact_title"
              label="Title"
              value={this.state.data.child_company_contact_title}
              onChange={this.updateField('child_company_contact_title')}
              margin="normal"
              fullWidth
              helperText={this.state.error.child_company_contact_title}
              error={(this.state.data.child_company_contact_title !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="child_company_contact_phone"
              label="Contact Phone"
              value={this.state.data.child_company_contact_phone}
              onChange={this.updateField('child_company_contact_phone')}
              margin="normal"
              fullWidth
              onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
              }}
              helperText={this.state.error.child_company_contact_phone}
              error={(this.state.data.child_company_contact_phone !== "")
              ? false
              : true}/>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}
class BillingAddressForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>Billing Address Form</Fragment>
    )
  }
}
class ServiceTypeForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>Service Type
      </Fragment>
    )
  }
}

export {CompanyContactForm, CompanyOfficeForm, CorporateOfficeForm, BillingAddressForm, ServiceTypeForm};