import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import { matchPath, Redirect } from 'react-router-dom';
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
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {withStyles} from "@material-ui/core/styles";
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import CommonService from '../../service/commonServices';
import Config from '../../container/config';
import RegisterForm from './registerForm';
import $ from "jquery";
import './register.scss';

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
  return [
    "Create Your Account", 
    "Corporate Office Information", 
    "Company Branch/Local Office Information", 
    "Company Contact for Compliance", 
    "Billing Location Information", 
    "Service Type Your Company Offer"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Create Your Account";
    case 1:
      return "Corporate Office Information";
    case 2:
      return "Company Branch/Local Office Information";
    case 3:
      return "Company Contact for Compliance";
    case 4:
      return "Billing Location Information";
    case 5:
      return "Service Type Your Company Offer";
    default:
      return "Unknown step";
  }
}
const forms = [
  "Create Your Account",
  "Corporate Office Information", 
  "Company Branch/Local Office Information", 
  "Company Contact for Compliance", 
  "Billing Location Information", 
  "Service Type Your Company Offer"];

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      param: null,
      loader: false,
      us_states: [],
      registerForm: {
        "service_label_sub":[],
        "service_label":'',
        "name":'',
        "first_name": '',
        "last_name":'',
        "title":'',
        "phone_mobile":'',
        "fax":'',
        "email":'',
        "password":'',
        "comp_contact_fname": '',
        "comp_contact_lname": '',
        "comp_contact_email": '',
        "comp_contact_phone": '',
        "comp_contact_title": '',
        "child_company_name":'',
        "child_company_address":'',
        "child_company_city": '',
        "child_company_state": '',
        "child_company_zip":'',
        "child_company_contact_mail":'',
        "child_company_contact_main_phone":'',
        "child_company_contact_name":'',
        "child_company_contact_title":'',
        "child_company_contact_phone":'',
        "parent_company_name":'',
        "parent_company_address":'',
        "parent_company_city":'',
        "parent_company_state":'',
        "parent_company_zip":'',
        "parent_company_contact_mail":'',
        "parent_company_contact_main_phone":'',
        "parent_company_contact_name":'',
        "parent_company_contact_title":'',
        "parent_company_contact_phone":'',
        "billing_company_name":'',
        "billing_company_address":'',
        "billing_company_city":'',
        "billing_company_state":'',
        "billing_company_zip":'',
        "billing_company_contact_mail":'',
        "billing_company_contact_main_phone":'',
        "billing_company_contact_name":'',
        "billing_company_contact_title":'',
        "billing_company_contact_phone":'',
        "billing_email":'test@gmail.com' 
      },
      registerError: {},
      doRedirect: false, 
      redirectUrl: null
    };
    console.log("User Registration", props);
  }

  componentDidMount() {}

  componentWillMount() {
    this.getParams();
  }

  getParams() {
    const match = matchPath(this.props.history.location.pathname, {
        path: '/register/:id',
        exact: true,
        strict: false
    });
    if(match !== null && match.params.id !== undefined && match.params.id != ""){
      let state = this.state;
      state['param'] = match.params.id;
      this.fetchCompanyDetails(match.params.id);
      this.setState(state);
      console.log("Match URL Params", match, this.state);
    }else{
      window.location.href = "/";
    }
  }

  fetchCompanyDetails = (id) => {
    // console.log("axios.fetchCompanyDetails(id)", axios.fetchCompanyDetails(id));
    let url = axios.fetchCompanyDetails(id);
    this.setState({loader: true});
    axios
      .get(url)
      .then((response) => {
        this.setState({loader: false, us_states: response.us_states});
        response.vendor_details.first_name = (response.vendor_details.first_name != null) ? response.vendor_details.first_name : '';
        response.vendor_details.last_name = (response.vendor_details.last_name != null) ? response.vendor_details.last_name : '';
        let name = '';
        if(response.vendor_details.first_name !== '' && response.vendor_details.last_name !== ''){
          name = response.vendor_details.first_name + " " + response.vendor_details.last_name;
        }
        
        let obj = {
          "vendor_id": response.vendor_details.id,
          "com_id": response.company_details.id,
          'us_state_sugar_id': (response.vendor_details.us_state_sugar_id != null ) ? response.vendor_details.us_state_sugar_id : '',
          "service_label_sub":[],
          "service_label":(response.service != null) ? response.service : undefined,
          "name": name,
          "first_name":(response.vendor_details.first_name != null) ? response.vendor_details.first_name : '',
          "last_name":(response.vendor_details.last_name != null) ? response.vendor_details.last_name : undefined,
          "title":'',
          "phone_mobile":(response.vendor_details.phone_mobile != null) ? response.vendor_details.phone_mobile : '',
          "fax":'',
          "email":(response.company_details.company_email != null) ? response.company_details.company_email : '',
          "password":'',
          "comp_contact_fname": '',
          "comp_contact_lname": '',
          "comp_contact_email": (response.vendor_details.email != null) ? response.vendor_details.email : '',
          "comp_contact_phone": '',
          "comp_contact_title": '',
          "child_company_name":'',
          "child_company_address":'',
          "child_company_city": '',
          "child_company_state": '',
          "child_company_zip":'',
          "child_company_contact_mail":'',
          "child_company_contact_main_phone":'',
          "child_company_contact_name":'',
          "child_company_contact_title":'',
          "child_company_contact_phone":'',
          "parent_company_name": (response.company_details.company_name != null) ? response.company_details.company_name : '',
          "parent_company_address":'',
          "parent_company_city":'',
          "parent_company_state":'',
          "parent_company_zip":'',
          "parent_company_contact_mail":'',
          "parent_company_contact_main_phone":(response.company_details.company_phone != null) ? response.company_details.company_phone : '',
          "parent_company_contact_name":'',
          "parent_company_contact_title":'',
          "parent_company_contact_phone":'',
          "billing_company_name":'',
          "billing_company_address":'',
          "billing_company_city":'',
          "billing_company_state":'',
          "billing_company_zip":'',
          "billing_company_contact_mail":'',
          "billing_company_contact_main_phone":'',
          "billing_company_contact_name":'',
          "billing_company_contact_title":'',
          "billing_company_contact_phone":'',
          "billing_email":''
        };
        let state = this.state.registerForm;

        this.setState({registerForm: obj});
      })
      .catch(error => {
        if(error !== undefined && error.response.status !== 200){
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          });
          this.setState({
            doRedirect: true, 
            redirectUrl: '/login'
          });
        }
        console.log("At First Error", error);
      });
  }
  checkRegistrationValidation = () => {
    let {registerForm, registerError} = this.state;
    console.log("Current Active Tab",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           registerForm);

    if((/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(registerForm.email)){
      console.log("Current Email");
    }else{
      console.log("wrong email");
    }
  }

  handleNext = () => {

    const state = this.state;
    const data = this.state.registerForm;
    const error = this.state.registerError;


    /* Condtions for Switching Tabs */

    if (this.state.activeStep == 0){
      error["first_name"] = (data.first_name === "") ? null : "";
      error["last_name"] = (data.last_name === "") ? null : "";      
      error["password"] = (data.password === "") ? null : "";

      if(data.email === ""){
        error["email"] = null;
        error["email_Message"] = "Email Field is required";
      }

      this.setState(state => ({
        activeStep: state.activeStep,
        registerError: error
      }));
      
      if(error.first_name === null 
          || error.last_name === null 
          || error.email === null 
          || error.password === null){
        return false;
      }
    }


    if (this.state.activeStep == 1){
      error["parent_company_name"] = (data.parent_company_name === "") ? null : "";
      
      if(data.parent_company_name !== ""){
        error["parent_company_address"] = (data.parent_company_address === "") ? null : "";
        error["parent_company_state"] = (data.parent_company_state === "") ? null : "";
      }
      if(data.parent_company_contact_mail !== "" && error.parent_company_contact_mail === null){
        return false;
      }

      this.setState(state => ({
        activeStep: state.activeStep,
        registerError: error
      }));
      
      if(error.parent_company_name === null 
          || error.parent_company_address === null 
          || error.parent_company_state === null){
        return false;
      }
    }

    if (this.state.activeStep == 2){
      // error["child_company_name"] = (data.child_company_name === "") ? null : "";
      
      if(data.child_company_name !== ""){
        error["child_company_address"] = (data.child_company_address === "") ? null : "";
        error["child_company_state"] = (data.child_company_state === "") ? null : "";
      }
      if(data.child_company_contact_mail !== "" && error.child_company_contact_mail === null){
        return false;
      }

      this.setState(state => ({
        activeStep: state.activeStep,
        registerError: error
      }));
      
      if(error.child_company_name === null 
          || error.child_company_address === null 
          || error.child_company_state === null){
        return false;
      }
    }

    if (this.state.activeStep == 3) {
      // error["comp_contact_email"] = (data.comp_contact_email === "") ? null : "";
      error["comp_contact_phone"] = (data.comp_contact_phone === "") ? null : "";

      if(data.comp_contact_email === ""){
        error["comp_contact_email"] = null;
        error["comp_contact_email_Message"] = "Email Field is required";
      }

      this.setState(state => ({
        activeStep: state.activeStep,
        registerError: error
      }));

      if(data.comp_contact_email !== "" && error.comp_contact_email === null){
        return false;
      }

      if(error.comp_contact_email === null && error.comp_contact_phone === null){
        return false;
      }
    }
    if (this.state.activeStep == 4){
      // error["billing_company_name"] = (data.billing_company_name === "") ? null : "";
      if(data.billing_company_name !== ""){
        error["billing_company_address"] = (data.billing_company_address === "") ? null : "";
        error["billing_company_state"] = (data.billing_company_state === "") ? null : "";
      }
      
      if(data.billing_company_contact_mail !== "" && error.billing_company_contact_mail === null){
        return false;
      }

      this.setState(state => ({
        activeStep: state.activeStep,
        registerError: error
      }));
      
      if(error.billing_company_name === null 
          || error.billing_company_address === null 
          || error.billing_company_state === null){
        return false;
      }
    }



    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };
  submitForm = () => {
    console.log("Final Object", this.state.registerForm);
    // window.location.href = "/login";
    let url = axios.registerUser();
    // debugger;
    axios
      .post(url, this.state.registerForm)
      .then((response) => {        
        toast.success("Successfully Registered", {
          position: toast.POSITION.TOP_CENTER,
          className: 'rotateY animated'
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
        console.log("Registration Completed", response);
      })
      .catch(function (error) {
        toast.error((error.response.data.message != null) ? error.response.data.message : "Something went wrong! Please register again..", {
          position: toast.POSITION.TOP_CENTER
        });
        console.log("At First Error", error);
      });
  }

  handleBack = () => {
    /* toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER
    }); */
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
    let state = this.state;
    state['registerForm'][field] = event.target.value;
    this.setState(state);
  }

  updateFormData = (data, field) => {
    /* console.log("Update Contact Company", data); */
    if(field === "parent_company_contact_mail" 
        || field === "child_company_contact_mail" 
        || field === "billing_company_contact_mail" 
        || field === "email"
        || field === "comp_contact_email"){
          this.emailValidation(data);
        }
    

    let registerFormDate = this.state.registerForm;
    let registerForm = { ...registerFormDate, ...data.data};
    let registerErrorObj = this.state.registerError;
    let registerError = { ...registerErrorObj, ...data.error};
    this.setState({registerForm, registerError});
    /* console.log("New State OBject", this.state); */
  }
  getFormData = () => {
    return this.state.registerForm;
  }
  emailValidation = (data) => {
    let {RegisterForm, registerError} = this.state;
    let key = "";
    let message = "";
    if(this.state.activeStep === 0){
      key = "email";
      message = "Email is required";
    }else if(this.state.activeStep === 1){
      key = "parent_company_contact_mail"
      message = "Carporate Email is required";
    }else if(this.state.activeStep === 2){
      key = "child_company_contact_mail"
      message = "Company Email is required";
    }else if(this.state.activeStep === 3){
      key = "comp_contact_email";
      message = "Email is required";
    }else if(this.state.activeStep === 4){
      key = "billing_company_contact_mail"
      message = "Billing Email is required";
    }

    let expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if(data.data[key] === ""){
        let {registerError} = this.state;
        registerError[key] = null;
        registerError[key+"_Message"] = message;
        this.setState({registerError});
      }else{
        if(expression.test(data.data[key])){
          let {registerError} = this.state;
          console.log("At Input success", data.data[key]);
          registerError[key] = "";
          registerError[key+"_Message"] = "";
          this.setState({registerError});                    
        }else{
          let {registerError} = this.state;
          registerError[key] = null;
          registerError[key+"_Message"] = "Invalid Email";
          this.setState({registerError});
          console.log("At Input Failed", data.data[key]);
        }
      }
  }

  companyContactHandleCheckboxChange = name => event => {
    /* console.log("---Start--- \n\nSelected Checkbox \n", name, event.target.checked, "\n ---End--"); */
    let categories = this.state.registerForm;
    categories.companyContact.categories[name] = event.target.checked;
    this.setState({registerForm: categories});
  };
 

  render() {
    const {classes} = this.props;
    const { activeStep, registerForm, registerError, loader, us_states, doRedirect, redirectUrl} = this.state;
    const steps = getSteps();

    if (doRedirect) {
      return <Redirect to={redirectUrl}/>;
    }

    return (
      <Grid container className={classes.root + " stepperHolder"}>
        {/* <div style={{
          'display': "block", 
          'width': "100%", 
          'border': "1px solid #c00",
          'wordWrap': "break-word"
        }}>
          {JSON.stringify(registerForm)}
        </div> */}
        <Grid item xs={12} sm={12} md={12} lg={12}>          
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
                  <div className="registrationFormHolder">
                    <RegisterForm
                        activeTab = {getStepContent(activeStep)}
                        formData = {registerForm}
                        formError = {registerError}
                        us_states = {us_states}
                        updateFormData = {this.updateFormData.bind(this)}
                    />
                  </div>
                  <div className="margin-top-20 text-right btnHolder">
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className="btn btn-secondary">
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={
                        (activeStep === steps.length - 1) 
                              ? this.submitForm 
                              : this.handleNext
                      }
                      className="btn btn-primary">
                      {activeStep === steps.length - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                  </div>
                </div>
              )}
          </Fragment>
          {CommonService.renderLoader(loader)}
          {/* <ToastContainer autoClose={5000} /> */}
        </Grid>
      </Grid>
    );
  }
}

UserRegistration.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(UserRegistration);
