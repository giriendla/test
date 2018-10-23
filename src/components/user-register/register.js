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
// import {CompanyContactForm, CompanyOfficeForm, CorporateOfficeForm, BillingAddressForm, ServiceTypeForm} from './form';

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
const forms = ["Company Contact for Compliance", "Company Branch/Local Office Information", "Corporate Office Information", "Billing Location Information", "Service Type Your Company Offer"];

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      registerForm: {
        "first_name": "",
        "last_name": "",
        "phone_mobile": "",
        "email": "",
        "password": "",
        "service_label": [],
        "child_company_name": "",
        "child_company_address": "",
        "child_company_city": "",
        "child_company_state": "",
        "child_company_zip": "",
        "child_company_contact_mail": "",
        "child_company_contact_phone": "",
        "child_company_contact_name": "",
        "parent_company_name": "",
        "parent_company_address": "",
        "parent_company_city": "",
        "parent_company_state": "",
        "parent_company_zip": "",
        "parent_company_contact_mail": "",
        "parent_company_contact_phone": "",
        "parent_company_contact_name": "",
        "parent_company_contact_title": "",
        "billing_company_name": "",
        "billing_company_address": "",
        "billing_company_city": "",
        "billing_company_state": "",
        "billing_company_zip": "",
        "billing_company_contact_mail": "",
        "billing_company_contact_phone": "",
        "billing_company_contact_name": "",
        "billing_company_contact_title": ""
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
      return index === 0
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
    fieldUpdate.companyContact[field + '_error'] = (event.target.value)
      ? ""
      : field + " is required!";
    this.setState({registerForm: fieldUpdate});
    /* this.setState({
      [field]: event.target.value,
      [field + "_error"]: (event.target.value)
        ? ""
        : field + " is required!"
    }); */
  }

  updateContactCompany = data => {
    console.log("Update Contact Company", data);
    let registerForm = this.state.registerForm;
    let newRegisterForm = {
      ...registerForm,
      ...data
    };
    this.setState({registerForm: newRegisterForm});
    console.log("New State OBject", this.state);
  }
  getFormData = () => {
    return this.state.registerForm;
  }

  companyContactHandleCheckboxChange = name => event => {
    console.log("---Start--- \n\nSelected Checkbox \n", name, event.target.checked, "\n ---End--");
    let categories = this.state.registerForm;
    categories.companyContact.categories[name] = event.target.checked;
    this.setState({registerForm: categories});
  };

  renderStepperComponent = (view) => {

    return (
      <Fragment>
        <div
          style={{
          'display': (forms[0] === view)
            ? 'block'
            : 'none'
        }}>
          <CompanyContact data={this.state.registerForm}/>
        </div>
        <div
          style={{
          'display': (forms[1] === view)
            ? 'block'
            : 'none'
        }}>updateContactCompany</div>
      </Fragment>
    )
    /* if (forms[0] === view) {
      return (<CompanyContactForm
        {...this.props}
        updateContactCompany={this.updateContactCompany} formData={this.state.registerForm}/>)
    } else if (forms[1] === view) {
      return (<CompanyOfficeForm {...this.props}
        updateContactCompany={this.updateContactCompany} formData={this.getFormData}/>)
    } else if (forms[2] === view) {
      return (<CorporateOfficeForm {...this.props}
        updateContactCompany={this.updateContactCompany}/>)
    } else if (forms[3] === view) {
      return (<BillingAddressForm {...this.props}
        updateContactCompany={this.updateContactCompany}/>)
    } else if (forms[3] === view) {
      return (<ServiceTypeForm {...this.props}
        updateContactCompany={this.updateContactCompany}/>)
    } */
  }

  render() {
    const {classes} = this.props;
    const {activeStep} = this.state;
    const steps = getSteps();

    return (
      <Grid container className={classes.root + " stepperHolder"}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {/* JSON.stringify(this.state) */}
          <Stepper
            className="stepperContainer"
            activeStep={activeStep}
            connector={<StepConnector classes = {{ line: classes.line }}/>}
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
                  {/* <RegistrationForm {...this.props} component={getStepContent(activeStep)}/> */}
                  {this.renderStepperComponent(getStepContent(activeStep))}
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

const CompanyContact = (props) => {

  debugger;
  
  return (
    <Fragment>
      {props}
    </Fragment>
  )
}