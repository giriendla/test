import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {POINT_CONVERSION_COMPRESSED} from 'constants';
import {
  Grid,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Hidden
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {Favorite, FavoriteBorder} from '@material-ui/icons';

const forms = ["Company Contact for Compliance", "Company Branch/Local Office Information", "Corporate Office Information", "Billing Location Information", "Service Type Your Company Offer"];

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.state,
      registerForm: {
        companyContact: {
          name: "",
          name_error: false,
          title: "",
          title_error: false,
          phone: "",
          phone_error: false,
          fax: "",
          fax_error: false,
          email: "",
          email_error: false,
          categories: {
            carporateOwner: false,
            branchLocation: false,
            soleProprietorship: false,
            franchisee: false,
            franchisor: false,
            staffingAgency: false
          }
        },
        companyOffice: {},
        corporateOffice: {},
        billingLocation: {},
        serviceType: {}
      },
      registerFormError: {
        companyContact: {
          name: false,
          title: false,
          phone: false,
          fax: false,
          email: false,
          categories: false
        }
      }

    };
    this.loadComponent = this.props.component;
    console.log("Loading Componet State", this.state);
    console.log("Loading Componet Props", props);
  }

  /* Component Life Cycles */
  componentDidMount() {}
  componentWillUpdate() {
    console.log("State Updated", this.state);
  }
  componentDidUpdate() {
    // console.log("Compnent did Update\n\n", "\n",this.loadComponent,
    // "\n",this.props.component);
    this.checkFormChange();
    this.loadComponent = this.props.component;
  }

  /* End Component Life Cycles */

  camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+ match === 0) 
        return ""; // or if (/\s+/.test(match)) for white spaces
      return index == 0
        ? match.toLowerCase()
        : match.toUpperCase();
    });
  }

  checkFormChange() {
    if (this.loadComponent !== this.props.component) {
      console.log("Page Changed to ", this.props.component);
    } else {
      // console.log("Page Didn't Change");
    }
  }
  updateField = field => event => {
    console.log("Updated ", field, event);
    let fieldUpdate = this.state.registerForm;
    fieldUpdate.companyContact[field] = event.target.value;
    fieldUpdate.companyContact[field+'_error'] = (event.target.value) ? "" : field + " is required!";

    this.setState({
      registerForm: fieldUpdate
    });
    /* this.setState({
      [field]: event.target.value,
      [field + "_error"]: (event.target.value)
        ? ""
        : field + " is required!"
    }); */
  }

  companyContactHandleCheckboxChange = name => event => {
    /* console.log("Selected Checkbox", name, event.target.checked); */
    let categories = this.state.registerForm;
    categories.companyContact.categories[name] = event.target.checked;
    this.setState({registerForm: categories});
  };
  // Stepper Forms
  companyContactForm = () => {
    return (
      <Fragment>
          {/* JSON.stringify(this.state.registerForm.companyContact) */}
          <Grid container spacing={32}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="name"
                label="Name"
                value={this.state.registerForm.companyContact.name}
                onChange={this.updateField('name')}
                margin="normal"
                fullWidth
                helperText={this.state.registerForm.companyContact.name_error}
                error={(this.state.registerForm.companyContact.name == "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="title"
                label="Title"
                value={this.state.registerForm.companyContact.title}
                onChange={this.updateField('title')}
                margin="normal"
                fullWidth
                helperText={this.state.firstname_error}
                error={(this.state.registerForm.companyContact.title == "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="phone"
                label="Phone"
                value={this.state.registerForm.companyContact.phone}
                onChange={this.updateField('phone')}
                margin="normal"
                fullWidth
                helperText={this.state.firstname_error}
                error={(this.state.registerForm.companyContact.phone == "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="fax"
                label="Fax"
                value={this.state.registerForm.companyContact.fax}
                onChange={this.updateField('fax')}
                margin="normal"
                fullWidth
                helperText={this.state.firstname_error}
                error={(this.state.registerForm.companyContact.fax == "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="email"
                label="Email"
                value={this.state.registerForm.companyContact.email}
                onChange={this.updateField('email')}
                margin="normal"
                fullWidth
                helperText={this.state.firstname_error}
                error={(this.state.registerForm.companyContact.email == "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <b>Submitting As:</b>
              <FormGroup row>
                <FormControlLabel
                  control={< Checkbox checked = {
                  this.state.registerForm.companyContact.categories.carporateOwner
                }
                onChange = {
                  this.companyContactHandleCheckboxChange('carporateOwner')
                }
                value = "carporateOwner" color = "primary" />}
                  label="Corporate Owner"/>
                <FormControlLabel
                  control={< Checkbox checked = {
                  this.state.registerForm.companyContact.categories.branchLocation
                }
                onChange = {
                  this.companyContactHandleCheckboxChange('branchLocation')
                }
                value = "branchLocation" color = "primary" />}
                  label="Branch Location"/>
                <FormControlLabel
                  control={< Checkbox checked = {
                  this.state.registerForm.companyContact.categories.soleProprietorship
                }
                onChange = {
                  this.companyContactHandleCheckboxChange('soleProprietorship')
                }
                value = "soleProprietorship" color = "primary" />}
                  label="Sole Proprietorship"/>
                <FormControlLabel
                  control={< Checkbox checked = {
                  this.state.registerForm.companyContact.categories.franchisee
                }
                onChange = {
                  this.companyContactHandleCheckboxChange('franchisee')
                }
                value = "franchisee" color = "primary" />}
                  label="Franchisee"/>
                <FormControlLabel
                  control={< Checkbox checked = {
                  this.state.registerForm.companyContact.categories.franchisor
                }
                onChange = {
                  this.companyContactHandleCheckboxChange('franchisor')
                }
                value = "franchisor" color = "primary" />}
                  label="Franchisor"/>
                <FormControlLabel
                  control={< Checkbox checked = {
                  this.state.registerForm.companyContact.categories.staffingAgency
                }
                onChange = {
                  this.companyContactHandleCheckboxChange('staffingAgency')
                }
                value = "staffingAgency" color = "primary" />}
                  label="Staffing Agency"/>
              </FormGroup>
            </Grid>
          </Grid>
        </Fragment>
    )
  }
  localOfficeInformationForm = () => {
    return (
      <Fragment>
        Local Office Information Form
      </Fragment>
    )
  }
  corporateOfficeInformationForm = () => {
    return (
      <Fragment>
        Corporate Office Information Form
      </Fragment>
    )
  }
  billingLocationInformationForm = () => {
    return (
      <Fragment>
        Billing Location Information Form
      </Fragment>
    )
  }
  serviceTypeCompanyOfferForm = () => {
    return (
      <Fragment>
        Service Type Company Offer Form
      </Fragment>
    )
  }

  // Stepper Forms End
  showRegisterForm = (loadView) => {
    console.log("Loading View", loadView);
    if (loadView == forms[0]) {
      return this.companyContactForm();
    } else if (loadView == forms[1]) {
      return this.localOfficeInformationForm();
    } else if (loadView == forms[2]) {
      return this.corporateOfficeInformationForm();
    } else if (loadView == forms[3]) {
      return this.billingLocationInformationForm();
    } else if (loadView == forms[4]) {
      return this.serviceTypeCompanyOfferForm();
    }
  }

  render() {
    /* console.log("Loading Componet\n\n\t", this.props.component); */
    return (
      <Fragment>
        <Grid container>
        <Hidden only={["sm", "md", "lg", "xl"]}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="title" gutterBottom>
                {this.props.component}
              </Typography>
            </Grid>
          </Hidden>
          {this.showRegisterForm(this.props.component)}
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {state: state}
}

/* const mapDispatchToProps = dispatch => {
  return {
    destroyTodo: () =>
      dispatch({
        type: 'DESTROY_TODO'
      })
  }
} */

export default connect(mapStateToProps)(RegistrationForm);