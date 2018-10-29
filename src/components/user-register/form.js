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
    this.setState({data: this.props.formData});
    // this.refs.name.getInputNode().value = 'some value, hooray'
  }
  componentWillReceiveProps() {
  //  this.setState({data: this.props.formData});
    console.log("componentWillReceiveProps", this.state.data);
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
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="first_name"
                label="First Name"
                value={this.state.data.first_name}
                onChange={this.updateField('first_name')}
                margin="normal"
                inputRef={(e) => {
                  e.value = this.props.formData.first_name;
                  e.value = (e.value == "undefined") ? null : e.value;
                }}
                fullWidth
                helperText={this.state.error.first_name}
                error={(this.state.data.first_name !== null && this.state.data.first_name !== "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="last_name"
                label="Last Name"
                value={this.state.data.last_name}
                onChange={this.updateField('last_name')}
                margin="normal"
                inputRef={(e) => {                  
                  e.value = this.props.formData.last_name;
                  e.value = (e.value == "undefined") ? null : e.value;
                }}
                fullWidth
                helperText={this.state.error.last_name}
                error={(this.state.data.last_name !== '')
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TextField
                id="title"
                label="Title"
                value={this.state.data.title}
                onChange={this.updateField('title')}
                margin="normal"
                inputRef={(e) => {
                  e.value = this.props.formData.title;
                  e.value = (e.value == "undefined") ? null : e.value;
                }}
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
                inputRef={(e) => {
                  e.value = this.props.formData.phone_mobile;
                  e.value = (e.value == "undefined") ? null : e.value;
                }}
                fullWidth
                onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                  e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
                }}
                helperText={this.state.error.phone_mobile}
                error={(this.state.data.phone_mobile !== "")
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
                inputRef={(e) => {
                  e.value = this.props.formData.fax;
                  e.value = (e.value == "undefined") ? null : e.value;
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
                inputRef={(e) => {
                  e.value = this.props.formData.email;
                  e.value = (e.value == "undefined") ? null : e.value;
                }}
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
                type="password"
                value={this.state.data.password}
                onChange={this.updateField('password')}
                margin="normal"
                inputRef={(e) => {
                  e.value = this.props.formData.password;
                  e.value = (e.value == "undefined") ? null : e.value;
                }}
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
  componentDidMount() {
    /* this.setState({data: this.props.formData}); */
    this.setState({data: this.props.formData});
  }
  componentDidUpdate() {
    /* alert("at update"); */
  }
  componentWillMount() {
    /* alert("will mount"); */
  }
  componentWillUpdate() {
   /*  alert("will update"); */
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
              inputRef={(e) => {
                e.value = this.props.formData.child_comany_name;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
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
              inputRef={(e) => {
                e.value = this.props.formData.child_company_address;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
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
              inputRef={(e) => {
                e.value = this.props.formData.child_company_city;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
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
              inputRef={(e) => {
                e.value = this.props.formData.child_company_state;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
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
              inputRef={(e) => {
                e.value = this.props.formData.child_company_zip;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
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
              inputRef={(e) => {
                e.value = this.props.formData.child_company_contact_mail;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
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
              inputRef={(e) => {
                e.value = this.props.formData.child_company_contact_main_phone;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                  e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
              }}
              helperText={this.state.error.child_company_contact_main_phone}
              error={(this.state.data.child_company_contact_main_phone !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="child_company_contact_name"
              label="Contact Name"
              value={this.state.data.child_company_contact_name}
              onChange={this.updateField('child_company_contact_name')}
              margin="normal"
              inputRef={(e) => {
                e.value = this.props.formData.child_company_contact_name;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
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
              inputRef={(e) => {
                e.value = this.props.formData.child_company_contact_title;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
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
              inputRef={(e) => {
                e.value = this.props.formData.child_company_contact_phone;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              fullWidth
              onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                  e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
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

  componentDidMount() {
    this.setState({data: this.props.formData});
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
              id="parent_company_name"
              label="Company Name"
              value={this.state.data.parent_company_name}
              onChange={this.updateField('parent_company_name')}
              margin="normal"
              inputRef={(e) => {
                e.value = this.props.formData.parent_company_name;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              fullWidth
              helperText={this.state.error.parent_company_name}
              error={(this.state.data.parent_company_name !== '')
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="parent_company_address"
              label="Address"
              multiline
              rows="4"
              margin="normal"
              value={this.state.data.parent_company_address}
              onChange={this.updateField('parent_company_address')}
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.parent_company_address;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.parent_company_address}
              error={(this.state.data.parent_company_address !== '')
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="parent_company_city"
              label="City"
              value={this.state.data.parent_company_city}
              onChange={this.updateField('parent_company_city')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.parent_company_city;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.parent_company_city}
              error={(this.state.data.parent_company_city !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="parent_company_state"
              label="State"
              value={this.state.data.parent_company_state}
              onChange={this.updateField('parent_company_state')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.parent_company_state;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.parent_company_state}
              error={(this.state.data.parent_company_state !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="parent_company_zip"
              label="Zip"
              value={this.state.data.parent_company_zip}
              onChange={this.updateField('parent_company_zip')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.parent_company_zip;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.parent_company_zip}
              error={(this.state.data.parent_company_zip !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="parent_company_contact_mail"
              label="Contact Email"
              value={this.state.data.parent_company_contact_mail}
              onChange={this.updateField('parent_company_contact_mail')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.parent_company_contact_mail;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.parent_company_contact_mail}
              error={(this.state.data.parent_company_contact_mail !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="parent_company_contact_main_phone"
              label="Phone"
              value={this.state.data.parent_company_contact_main_phone}
              onChange={this.updateField('parent_company_contact_main_phone')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.parent_company_contact_main_phone;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                  e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
              }}
              helperText={this.state.error.parent_company_contact_main_phone}
              error={(this.state.data.parent_company_contact_main_phone !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="parent_company_contact_name"
              label="Contact Name"
              value={this.state.data.parent_company_contact_name}
              onChange={this.updateField('parent_company_contact_name')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.parent_company_contact_name;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.parent_company_contact_name}
              error={(this.state.data.parent_company_contact_name !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="parent_company_contact_title"
              label="Title"
              value={this.state.data.parent_company_contact_title}
              onChange={this.updateField('parent_company_contact_title')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.parent_company_contact_title;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.parent_company_contact_title}
              error={(this.state.data.parent_company_contact_title !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="parent_company_contact_phone"
              label="Contact Phone"
              value={this.state.data.parent_company_contact_phone}
              onChange={this.updateField('parent_company_contact_phone')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.parent_company_contact_phone;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                  e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
              }}
              helperText={this.state.error.parent_company_contact_phone}
              error={(this.state.data.parent_company_contact_phone !== "")
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
    this.state = {
      data: {},
      error: {},
      billingEmailRequired: false
    }
  }

  componentDidMount() {
    this.setState({data: this.props.formData});
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
    this
      .props
      .updateContactCompany(this.state.data);
  }
  handleCheckboxChange = name => event => {

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
    checkBillingEmailRequired = event => {
      let isChecked = this.state.billingEmailRequired;
      this.setState({'billingEmailRequired': event.target.checked});
      console.log("Checkbox Change", event.target.checked);
      if(!event.target.checked){
        let state = this.state.data;
        state['billing_email'] = "";
        this.setState({data: state});
        this.props.updateContactCompany(this.state.data);
      }
    }
    isBillingEmailRequired = () => {
      if(this.state.billingEmailRequired){        
        return (
          <Grid item xs={12} sm={12} md={12} lg={12}>  
            <TextField
                id="billing_email"
                label="Billing Email"
                value={this.state.data.billing_email}
                onChange={this.updateField('billing_email')}
                margin="normal"
                fullWidth
                helperText={this.state.error.billing_email}
                error={(this.state.data.billing_email !== "")
                ? false
                : true}/>        
          </Grid>
        )
      }      
    }
  render() {
    return (
      <Fragment>
        <Grid container spacing={32}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="billing_company_name"
              label="Company Name"
              value={this.state.data.billing_company_name}
              onChange={this.updateField('billing_company_name')}
              margin="normal"
              inputRef={(e) => {
                e.value = this.props.formData.billing_company_contact_name;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              fullWidth
              helperText={this.state.error.billing_company_name}
              error={(this.state.data.billing_company_name !== '')
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="billing_company_address"
              label="Address"
              multiline
              rows="4"
              margin="normal"
              value={this.state.data.billing_company_address}
              onChange={this.updateField('billing_company_address')}
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.billing_company_address;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.billing_company_address}
              error={(this.state.data.billing_company_address !== '')
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="billing_company_city"
              label="City"
              value={this.state.data.billing_company_city}
              onChange={this.updateField('billing_company_city')}
              margin="normal"
              inputRef={(e) => {
                e.value = this.props.formData.billing_company_city;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              fullWidth
              helperText={this.state.error.billing_company_city}
              error={(this.state.data.billing_company_city !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="billing_company_state"
              label="State"
              value={this.state.data.billing_company_state}
              onChange={this.updateField('billing_company_state')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.billing_company_state;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.billing_company_state}
              error={(this.state.data.billing_company_state !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="billing_company_zip"
              label="Zip"
              value={this.state.data.billing_company_zip}
              onChange={this.updateField('billing_company_zip')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.billing_company_zip;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.billing_company_zip}
              error={(this.state.data.billing_company_zip !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="billing_company_contact_mail"
              label="Contact Email"
              value={this.state.data.billing_company_contact_mail}
              onChange={this.updateField('billing_company_contact_mail')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.billing_company_contact_mail;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.billing_company_contact_mail}
              error={(this.state.data.billing_company_contact_mail !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="billing_company_contact_main_phone"
              label="Phone"
              value={this.state.data.billing_company_contact_main_phone}
              onChange={this.updateField('billing_company_contact_main_phone')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.billing_company_contact_main_phone;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                  e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
              }}
              helperText={this.state.error.billing_company_contact_main_phone}
              error={(this.state.data.billing_company_contact_main_phone !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              id="billing_company_contact_name"
              label="Contact Name"
              value={this.state.data.billing_company_contact_name}
              onChange={this.updateField('billing_company_contact_name')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.billing_company_contact_name;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.billing_company_contact_name}
              error={(this.state.data.billing_company_contact_name !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="billing_company_contact_title"
              label="Title"
              value={this.state.data.billing_company_contact_title}
              onChange={this.updateField('billing_company_contact_title')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                e.value = this.props.formData.billing_company_contact_title;
                e.value = (e.value == "undefined") ? null : e.value;
              }}
              helperText={this.state.error.billing_company_contact_title}
              error={(this.state.data.billing_company_contact_title !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              id="billing_company_contact_phone"
              label="Contact Phone"
              value={this.state.data.billing_company_contact_phone}
              onChange={this.updateField('billing_company_contact_phone')}
              margin="normal"
              fullWidth
              inputRef={(e) => {
                  e.value = this.props.formData.billing_company_contact_phone;
                  e.value = (e.value == "undefined") ? null : e.value;
                }}
              onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                  e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
              }}
              helperText={this.state.error.billing_company_contact_phone}
              error={(this.state.data.billing_company_contact_phone !== "")
              ? false
              : true}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControlLabel
              control={< Checkbox checked = {this.state.billingEmailRequired}
              onChange = {this.checkBillingEmailRequired}
              color = "primary" />}
              label="Check to receive invoice electronically"/>             
          </Grid>
          {this.isBillingEmailRequired()}          
        </Grid>
      </Fragment>
    )
  }
}
class ServiceTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {service_type: []},
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
    this
      .props
      .updateContactCompany(this.state.data);
  }
  handleCheckboxChange = name => event => {

    // console.log("---Start--- \n\nSelected Checkbox \n", name,
    // event.target.checked, "\n ---End--");
    let service_type = this.state;
    if (event.target.checked) {
      service_type
      .data
        .service_type
        .push(name);
    } else {
      /* console.log("Categores", service_type, service_type.service_type.indexOf(name) > -1); */
      let item = service_type.data
        .service_type
        .indexOf(name);
      if (item > -1) {
        service_type.data
          .service_type
          .splice(item, 1);
      }
    }
    this.setState(service_type);
    this
      .props
      .updateContactCompany(this.state.data);
    };
  render() {
    return (
      <Fragment>
        <Grid container>
        {/* <b>What Service Type Does Your Company Offer? <i>(Check all that Apply)</i></b> */}
        <FormGroup row>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControlLabel
                control={< Checkbox checked = {(this.state.data.service_type.indexOf("Doctor") > -1)}
                onChange = {this.handleCheckboxChange('Doctor')}
                value = "Doctor" color = "primary" />}
                label="Doctor"/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControlLabel
                control={<Checkbox checked = {(this.state.data.service_type.indexOf("DME") > -1)}
                onChange = {this.handleCheckboxChange('DME')}
                value = "DME" color = "primary" />}
                label="DME"/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControlLabel
              control={<Checkbox checked = {(this.state.data.service_type.indexOf("Home Care") > -1)}
            onChange = {
              this.handleCheckboxChange('Home Care')
            }
            value = "Home Care" color = "primary" />}
              label="Home Care"/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControlLabel 
                control={<Checkbox checked = {(this.state.data.service_type.indexOf("Home Health") > -1)}
                onChange = {this.handleCheckboxChange('Home Health')} 
                value = "Home Health" color="primary" />}
                label="Home Health"/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControlLabel
              control={< Checkbox checked = {(this.state.data.service_type.indexOf("Hospice") > -1)}
            onChange = {
              this.handleCheckboxChange('Hospice')
            }
            value = "Hospice" color = "primary" />}
              label="Hospice"/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControlLabel
              control={< Checkbox checked = {(this.state.data.service_type.indexOf("Marketer") > -1)}
            onChange = {
              this.handleCheckboxChange('Marketer')
            }
            value = "Marketer" color = "primary" />}
              label="Marketer"/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControlLabel
              control={< Checkbox checked = {(this.state.data.service_type.indexOf("Non-Healthcare – Other") > -1)}
            onChange = {
              this.handleCheckboxChange('Non-Healthcare – Other')
            }
            value = "Non-Healthcare – Other" color = "primary" />}
              label="Non-Healthcare – Other"/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControlLabel
              control={< Checkbox checked = {(this.state.data.service_type.indexOf("Nurse/PA") > -1)}
            onChange = {
              this.handleCheckboxChange('Nurse/PA')
            }
            value = "Nurse/PA" color = "primary" />}
              label="Nurse/PA"/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControlLabel
              control={< Checkbox checked = {(this.state.data.service_type.indexOf("Private Duty Sitter/Provider") > -1)}
            onChange = {
              this.handleCheckboxChange('Private Duty Sitter/Provider')
            }
            value = "Private Duty Sitter/Provider" color = "primary" />}
              label="Private Duty Sitter/Provider"/>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <FormControlLabel
              control={< Checkbox checked = {(this.state.data.service_type.indexOf("Healthcare - Other") > -1)}
            onChange = {
              this.handleCheckboxChange('Healthcare - Other')
            }
            value = "Healthcare - Other" color = "primary" />}
              label="Healthcare - Other"/>
          </Grid>
          </FormGroup>
        </Grid>
      </Fragment>
    )
  }
}

export {CompanyContactForm, CompanyOfficeForm, CorporateOfficeForm, BillingAddressForm, ServiceTypeForm};