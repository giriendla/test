import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Hidden
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import {withStyles} from "@material-ui/core/styles";
import './register.scss';

import RegistrationForm from './registrationForm';
import {CompanyContactForm, CompanyOfficeForm, CorporateOfficeForm, BillingAddressForm, ServiceTypeForm} from './form';

const styles = theme => {
  return {
    root: {
      width: "90%"
    },
    button: {
      marginRight: theme.spacing.unit
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    connectorActive: {
      "& $line": {
        borderColor: theme.palette.secondary.main
      }
    },
    connectorCompleted: {
      "& $line": {
        borderColor: theme.palette.primary.main
      }
    },
    line: {}
  };
};

function getSteps() {
  return ["Company Contact for Compliance", "Company Branch/Local Office Information", "Corporate Office Information", "Billing Location Information", "Service Type Your Company Offer"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Company Contact for Compliance";
    case 1:
      return "Company Branch/Local Office Information";
    case 2:
      return "Corporate Office Information";
    case 3:
      return "Billing Location Information";
    case 4:
      return "Service Type Your Company Offer";
    default:
      return "Unknown step";
  }
}

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
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
        }
      }
    };
    console.log("User Registration", props);
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };
  submitForm = () => {
    alert("Finished From");
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({activeStep: 0});
  };
  assignClasses = (classes) => {
    console.log("Classes", classes);
    return "stepperLabel";
  }
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
  loadStepperForm = () => {
    const {activeStep} = this.state;
    const steps = getSteps();
    if (getStepContent(activeStep) == steps[0]) {
      return (
        <Fragment>
          {JSON.stringify(this.state.registerForm.companyContact)}
          <Grid container spacing={32}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="name"
                label="Name"
                value={this.state.registerForm.companyContact.name}
                onChange={this.updateField('name')}
                margin="normal"
                fullWidth
                helperText={this.state.registerForm.companyContact.name}
                error={(this.state.registerForm.companyContact.name == "")
                ? false
                : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="title"
                label="Title"
                value={this.state.registerForm.companyContact.title}
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
    } else if (getStepContent(activeStep) == steps[1]) {
      return (<CompanyOfficeForm/>)
    } else if (getStepContent(activeStep) == steps[2]) {
      return (<CorporateOfficeForm/>)
    } else if (getStepContent(activeStep) == steps[3]) {
      return (<BillingAddressForm/>)
    } else if (getStepContent(activeStep) == steps[4]) {
      return (<ServiceTypeForm/>)
    }
  }

  render() {
    const {classes} = this.props;
    const {activeStep} = this.state;
    const steps = getSteps();

    return (
      <Grid container className={classes.root + " stepperHolder"}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {/* JSON.stringify(classes) */}
          <Stepper
            className="stepperContainer"
            activeStep={activeStep}
            connector={< StepConnector classes = {{ line: classes.line }}/>}
            orientation="horizontal">
            {steps.map(label => (
              <Step key={label}>
                <StepLabel disabled={false}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length
              ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&quot;re finished
                  </Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              )
              : (
                <div className="registrationFormContainer">
                  {this.loadStepperForm()}

                  <div className="margin-top-20">
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className="btn btn-secondary">
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(activeStep === steps.length - 1)
                      ? this.submitForm
                      : this.handleNext}
                      className="btn btn-primary">
                      {activeStep === steps.length - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                  </div>
                </div>
              )}
          </Fragment>
        </Grid>
      </Grid>
    );
  }
}

UserRegistration.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = state => {
  return {state: state}
}

export default connect(mapStateToProps)(withStyles(styles)(UserRegistration));
